import Link from "next/link";
import Navbar from "@/components/navbar";
import { PLANS } from "@/config/plans";

const features = [
  { icon: "🔐", title: "Authentication", description: "Email, OAuth, and magic link auth with NextAuth.js — ready out of the box." },
  { icon: "💳", title: "Payments", description: "Stripe subscriptions, one-time payments, and customer portal fully integrated." },
  { icon: "🗄️", title: "Database", description: "Prisma ORM with PostgreSQL. Type-safe queries, migrations, and seeding included." },
  { icon: "📧", title: "Email", description: "Transactional emails with React Email templates and your preferred provider." },
  { icon: "📊", title: "Dashboard", description: "Beautiful admin dashboard with analytics, settings, and team management." },
  { icon: "🌙", title: "Dark Mode", description: "System-aware dark mode with smooth transitions built into every component." },
];

const plans = [
  {
    ...PLANS.free,
    price: `$${PLANS.free.price}`,
    period: "forever",
    cta: "Get Started",
    highlighted: false,
  },
  {
    ...PLANS.pro,
    price: `$${PLANS.pro.price}`,
    period: "/mo",
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    ...PLANS.enterprise,
    price: `$${PLANS.enterprise.price}`,
    period: "/mo",
    cta: "Contact Sales",
    highlighted: false,
  },
];

const faqs = [
  {
    q: "What tech stack does LaunchStack use?",
    a: "LaunchStack is built with Next.js (App Router), TypeScript, Tailwind CSS, Prisma, NextAuth.js, and Stripe. Everything is fully typed and production-ready.",
  },
  {
    q: "Can I use LaunchStack for multiple projects?",
    a: "Yes! With a Pro or Enterprise license you can use LaunchStack for unlimited projects. The Free tier is limited to one project.",
  },
  {
    q: "Do I get updates and new features?",
    a: "Absolutely. All paid plans include lifetime updates. We ship new features, improvements, and security patches regularly.",
  },
  {
    q: "Is there a refund policy?",
    a: "We offer a 14-day money-back guarantee. If LaunchStack isn't the right fit, just reach out and we'll process a full refund.",
  },
  {
    q: "How do I deploy my app?",
    a: "LaunchStack works seamlessly with Vercel, but you can deploy anywhere that supports Node.js — Railway, Fly.io, AWS, or your own servers.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,rgba(99,102,241,0.12),transparent)] dark:bg-[radial-gradient(45%_40%_at_50%_60%,rgba(99,102,241,0.08),transparent)]" />
        <div className="mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 sm:pb-32 sm:pt-28 lg:px-8 lg:pt-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500" />
              </span>
              Now in public beta
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl dark:text-white">
              Ship your SaaS in{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                days, not months
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              LaunchStack gives you authentication, payments, database, email,
              and a beautiful dashboard — all wired up and ready to go. Stop
              rebuilding the same boilerplate and start shipping.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/auth/signup"
                className="w-full rounded-xl bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-700 hover:shadow-indigo-500/40 sm:w-auto"
              >
                Get Started Free
              </Link>
              <Link
                href="#features"
                className="w-full rounded-xl border border-zinc-300 bg-white px-8 py-3.5 text-sm font-semibold text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 sm:w-auto"
              >
                View Demo →
              </Link>
            </div>
            <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-500">
              No credit card required · Free tier available
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-zinc-200 bg-zinc-50 py-24 dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              Everything you need to launch
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Stop wasting weeks on boilerplate. LaunchStack has every feature
              your SaaS needs, pre-built and production-ready.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-indigo-700"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-2xl dark:bg-indigo-950">
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-zinc-200 py-24 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              Start free and scale as you grow. No hidden fees, cancel anytime.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-8 ${
                  plan.highlighted
                    ? "border-indigo-600 bg-indigo-600 shadow-xl shadow-indigo-500/20 dark:border-indigo-500"
                    : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-indigo-500 px-4 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </div>
                )}
                <h3
                  className={`text-lg font-semibold ${
                    plan.highlighted ? "text-white" : "text-zinc-900 dark:text-white"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`mt-1 text-sm ${
                    plan.highlighted ? "text-indigo-100" : "text-zinc-500 dark:text-zinc-400"
                  }`}
                >
                  {plan.description}
                </p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span
                    className={`text-4xl font-extrabold ${
                      plan.highlighted ? "text-white" : "text-zinc-900 dark:text-white"
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-sm ${
                      plan.highlighted ? "text-indigo-200" : "text-zinc-500 dark:text-zinc-400"
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>
                <ul className="mt-8 space-y-3">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-3">
                      <svg
                        className={`h-5 w-5 flex-shrink-0 ${
                          plan.highlighted ? "text-indigo-200" : "text-indigo-600 dark:text-indigo-400"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span
                        className={`text-sm ${
                          plan.highlighted ? "text-indigo-50" : "text-zinc-600 dark:text-zinc-400"
                        }`}
                      >
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/dashboard"
                  className={`mt-8 block w-full rounded-xl py-3 text-center text-sm font-semibold transition-colors ${
                    plan.highlighted
                      ? "bg-white text-indigo-700 hover:bg-indigo-50"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-zinc-200 bg-zinc-50 py-24 dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
            Frequently asked questions
          </h2>
          <div className="mt-16 space-y-8">
            {faqs.map((faq) => (
              <div key={faq.q}>
                <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
                  {faq.q}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-12 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white">
                L
              </div>
              <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                LaunchStack
              </span>
            </div>
            <div className="flex gap-6">
              {["Features", "Pricing", "Docs", "Blog", "Changelog"].map((l) => (
                <Link
                  key={l}
                  href="#"
                  className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                >
                  {l}
                </Link>
              ))}
            </div>
            <p className="text-sm text-zinc-400 dark:text-zinc-500">
              © {new Date().getFullYear()} LaunchStack
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
