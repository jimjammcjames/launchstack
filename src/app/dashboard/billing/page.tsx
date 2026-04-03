"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { PLANS } from "@/config/plans";

interface PricingTier {
  name: string;
  price: string;
  period: string;
  features: readonly string[];
  planKey: string;
}

const tiers: PricingTier[] = [
  {
    name: PLANS.free.name,
    price: `$${PLANS.free.price}`,
    period: "forever",
    features: PLANS.free.features,
    planKey: "free",
  },
  {
    name: PLANS.pro.name,
    price: `$${PLANS.pro.price}`,
    period: "/mo",
    features: PLANS.pro.features,
    planKey: "pro",
  },
  {
    name: PLANS.enterprise.name,
    price: `$${PLANS.enterprise.price}`,
    period: "/mo",
    features: PLANS.enterprise.features,
    planKey: "enterprise",
  },
];

export default function BillingPage() {
  const { data: session } = useSession();
  const [portalLoading, setPortalLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);

  const currentPlan = session?.user?.plan || "free";
  const planLabel = currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1);
  const planPrice = currentPlan === "pro" ? "$29" : currentPlan === "enterprise" ? "$99" : "$0";

  const handleManagePortal = async () => {
    setPortalLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      // Portal not available
    } finally {
      setPortalLoading(false);
    }
  };

  const handleCheckout = async (planKey: string) => {
    const plan = PLANS[planKey as keyof typeof PLANS];
    if (!("priceId" in plan)) return;
    setCheckoutLoading(planKey);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: plan.priceId, planName: planKey }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      // Checkout error
    } finally {
      setCheckoutLoading(null);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Billing
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Manage your subscription and view billing history.
        </p>
      </div>

      {/* Current Plan */}
      <section className="rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-white">
            Current Plan
          </h2>
        </div>
        <div className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-zinc-900 dark:text-white">
                {planLabel} Plan
              </span>
              <span className="rounded-full bg-indigo-100 px-3 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                Current
              </span>
            </div>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {currentPlan === "free"
                ? "Free forever — upgrade to unlock more features"
                : `${planPrice}/month · Manage billing details via Stripe`}
            </p>
          </div>
          {currentPlan !== "free" && (
            <button
              onClick={handleManagePortal}
              disabled={portalLoading}
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              {portalLoading ? "Loading…" : "Manage on Stripe →"}
            </button>
          )}
        </div>
      </section>

      {/* Pricing Tiers */}
      <section>
        <h2 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-white">
          Available Plans
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {tiers.map((tier) => {
            const isCurrent = tier.planKey === currentPlan;
            return (
              <div
                key={tier.name}
                className={`rounded-xl border p-6 ${
                  isCurrent
                    ? "border-indigo-300 bg-indigo-50/50 ring-1 ring-indigo-200 dark:border-indigo-700 dark:bg-indigo-950/30 dark:ring-indigo-800"
                    : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                }`}
              >
                <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
                  {tier.name}
                </h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-zinc-900 dark:text-white">
                    {tier.price}
                  </span>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    {tier.period}
                  </span>
                </div>
                <ul className="mt-6 space-y-2.5">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                      <svg className="h-4 w-4 flex-shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  disabled={isCurrent || checkoutLoading === tier.planKey}
                  onClick={() => !isCurrent && handleCheckout(tier.planKey)}
                  className={`mt-6 w-full rounded-lg py-2.5 text-sm font-medium transition-colors ${
                    isCurrent
                      ? "cursor-default bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
                      : "bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
                  }`}
                >
                  {isCurrent
                    ? "Current Plan"
                    : checkoutLoading === tier.planKey
                      ? "Redirecting…"
                      : `Upgrade to ${tier.name}`}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Billing History Note */}
      <section className="rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-white">
            Billing History
          </h2>
        </div>
        <div className="p-6 text-center">
          {currentPlan === "free" ? (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              No billing history yet. Upgrade to a paid plan to get started.
            </p>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                View and download invoices from your Stripe billing portal.
              </p>
              <button
                onClick={handleManagePortal}
                disabled={portalLoading}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:opacity-50"
              >
                {portalLoading ? "Loading…" : "View Invoices on Stripe"}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
