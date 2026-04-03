import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown verification error";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data
          .object as Stripe.Checkout.Session;

        if (session.mode === "subscription" && session.subscription) {
          const subscriptionId =
            typeof session.subscription === "string"
              ? session.subscription
              : session.subscription.id;

          const subscription =
            await stripe.subscriptions.retrieve(subscriptionId);

          const userId =
            session.metadata?.userId ??
            (await getUserIdByCustomer(session.customer as string));

          if (userId) {
            const priceId =
              subscription.items.data[0]?.price.id ?? null;
            const periodEnd = new Date(
              (subscription.items.data[0]?.current_period_end ?? 0) * 1000
            );
            const planName = session.metadata?.planName ?? "pro";

            await prisma.user.update({
              where: { id: userId },
              data: {
                subscriptionId: subscription.id,
                subscriptionStatus: subscription.status,
                plan: planName,
              },
            });

            await prisma.subscription.upsert({
              where: { stripeSubscriptionId: subscription.id },
              create: {
                userId,
                stripeSubscriptionId: subscription.id,
                stripePriceId: priceId ?? "",
                stripeCurrentPeriodEnd: periodEnd,
                status: subscription.status,
                plan: planName,
              },
              update: {
                stripePriceId: priceId ?? "",
                stripeCurrentPeriodEnd: periodEnd,
                status: subscription.status,
                plan: planName,
              },
            });
          }
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;

        const subscriptionRef =
          invoice.parent?.subscription_details?.subscription;
        if (!subscriptionRef) break;

        const subscriptionId =
          typeof subscriptionRef === "string"
            ? subscriptionRef
            : subscriptionRef.id;

        const subscription =
          await stripe.subscriptions.retrieve(subscriptionId);

        const userId = await getUserIdByCustomer(
          invoice.customer as string
        );

        if (userId) {
          const priceId =
            subscription.items.data[0]?.price.id ?? null;
          const periodEnd = new Date(
            (subscription.items.data[0]?.current_period_end ?? 0) * 1000
          );

          await prisma.user.update({
            where: { id: userId },
            data: { subscriptionStatus: subscription.status },
          });

          await prisma.subscription.update({
            where: { stripeSubscriptionId: subscription.id },
            data: {
              stripePriceId: priceId ?? "",
              stripeCurrentPeriodEnd: periodEnd,
              status: subscription.status,
            },
          });
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data
          .object as Stripe.Subscription;

        const userId = await getUserIdByCustomer(
          subscription.customer as string
        );

        if (userId) {
          await prisma.user.update({
            where: { id: userId },
            data: {
              subscriptionId: null,
              subscriptionStatus: "canceled",
              plan: "free",
            },
          });

          await prisma.subscription.update({
            where: { stripeSubscriptionId: subscription.id },
            data: { status: "canceled" },
          });
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

async function getUserIdByCustomer(
  customerId: string
): Promise<string | null> {
  const user = await prisma.user.findFirst({
    where: { stripeCustomerId: customerId },
    select: { id: true },
  });
  return user?.id ?? null;
}
