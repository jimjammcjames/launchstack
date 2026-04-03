import Link from "next/link";
import { PLANS } from "@/config/plans";

interface PricingTier {
  name: string;
  price: string;
  period: string;
  features: readonly string[];
  current: boolean;
}

const tiers: PricingTier[] = [
  {
    name: PLANS.free.name,
    price: `$${PLANS.free.price}`,
    period: "forever",
    features: PLANS.free.features,
    current: false,
  },
  {
    name: PLANS.pro.name,
    price: `$${PLANS.pro.price}`,
    period: "/mo",
    features: PLANS.pro.features,
    current: true,
  },
  {
    name: PLANS.enterprise.name,
    price: `$${PLANS.enterprise.price}`,
    period: "/mo",
    features: PLANS.enterprise.features,
    current: false,
  },
];

const billingHistory = [
  { id: 1, date: "Dec 15, 2024", amount: "$29.00", status: "Paid", invoice: "#INV-0042" },
  { id: 2, date: "Nov 15, 2024", amount: "$29.00", status: "Paid", invoice: "#INV-0036" },
  { id: 3, date: "Oct 15, 2024", amount: "$29.00", status: "Paid", invoice: "#INV-0029" },
  { id: 4, date: "Sep 15, 2024", amount: "$29.00", status: "Paid", invoice: "#INV-0021" },
];

export default function BillingPage() {
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
                Pro Plan
              </span>
              <span className="rounded-full bg-indigo-100 px-3 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                Current
              </span>
            </div>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              $29/month · Next billing date: Jan 15, 2025
            </p>
          </div>
          <Link
            href="#"
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Manage on Stripe →
          </Link>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section>
        <h2 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-white">
          Available Plans
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-xl border p-6 ${
                tier.current
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
                disabled={tier.current}
                className={`mt-6 w-full rounded-lg py-2.5 text-sm font-medium transition-colors ${
                  tier.current
                    ? "cursor-default bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {tier.current ? "Current Plan" : `Upgrade to ${tier.name}`}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Billing History */}
      <section className="rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-white">
            Billing History
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800">
                <th className="px-6 py-3 font-medium text-zinc-500 dark:text-zinc-400">
                  Date
                </th>
                <th className="px-6 py-3 font-medium text-zinc-500 dark:text-zinc-400">
                  Invoice
                </th>
                <th className="px-6 py-3 font-medium text-zinc-500 dark:text-zinc-400">
                  Amount
                </th>
                <th className="px-6 py-3 font-medium text-zinc-500 dark:text-zinc-400">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {billingHistory.map((row) => (
                <tr key={row.id}>
                  <td className="px-6 py-4 text-zinc-900 dark:text-white">
                    {row.date}
                  </td>
                  <td className="px-6 py-4 text-zinc-500 dark:text-zinc-400">
                    {row.invoice}
                  </td>
                  <td className="px-6 py-4 font-medium text-zinc-900 dark:text-white">
                    {row.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
