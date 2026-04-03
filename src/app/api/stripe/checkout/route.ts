import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { priceId, planName } = (await req.json()) as {
      priceId: string;
      planName: string;
    };

    if (!priceId) {
      return NextResponse.json(
        { error: "Price ID is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create or reuse Stripe customer
    let stripeCustomerId = user.stripeCustomerId;

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email!,
        name: user.name ?? undefined,
        metadata: { userId: user.id },
      });

      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: customer.id },
      });

      stripeCustomerId = customer.id;
    }

    const origin = req.headers.get("origin") ?? process.env.NEXTAUTH_URL;

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/dashboard?checkout=success&plan=${planName}`,
      cancel_url: `${origin}/pricing?checkout=cancelled`,
      metadata: {
        userId: user.id,
        planName,
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
