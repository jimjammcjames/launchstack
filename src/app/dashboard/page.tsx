import Link from "next/link";
import { getCurrentUser } from "@/lib/auth-helpers";

interface StatCard {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
}

// TODO: Replace these demo stats with real queries from your database
const stats: StatCard[] = [
  { label: "Total Projects", value: "12", change: "+2 this month", trend: "up" },
  { label: "Active Users", value: "1,429", change: "+14.2%", trend: "up" },
  { label: "Revenue", value: "$8,240", change: "+23.1%", trend: "up" },
  { label: "Growth", value: "32%", change: "+4.5%", trend: "up" },
];

// TODO: Replace with real activity from your database or event stream
const recentActivity = [
  { id: 1, action: "New user signed up", detail: "sarah@example.com", time: "2 minutes ago" },
  { id: 2, action: "Payment received", detail: "$29.00 — Pro plan", time: "15 minutes ago" },
  { id: 3, action: "Project deployed", detail: "my-saas-app to production", time: "1 hour ago" },
  { id: 4, action: "Subscription upgraded", detail: "Free → Pro", time: "3 hours ago" },
  { id: 5, action: "New user signed up", detail: "mike@example.com", time: "5 hours ago" },
];

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const firstName = user?.name?.split(" ")[0] || "there";

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Welcome back, {firstName} 👋
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Here&apos;s what&apos;s happening with your projects today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              {stat.label}
            </p>
            <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white">
              {stat.value}
            </p>
            <p className="mt-1 flex items-center gap-1 text-sm">
              <span
                className={
                  stat.trend === "up"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-red-600 dark:text-red-400"
                }
              >
                {stat.trend === "up" ? "↑" : "↓"} {stat.change}
              </span>
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="lg:col-span-2 rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-white">
              Recent Activity
            </h2>
          </div>
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-white">
                    {item.action}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {item.detail}
                  </p>
                </div>
                <span className="whitespace-nowrap text-xs text-zinc-400 dark:text-zinc-500">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-white">
              Quick Actions
            </h2>
          </div>
          <div className="flex flex-col gap-2 p-4">
            <Link
              href="/dashboard/projects"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-lg dark:bg-indigo-950">
                🚀
              </span>
              New Project
            </Link>
            <Link
              href="/dashboard/analytics"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-lg dark:bg-emerald-950">
                📊
              </span>
              View Analytics
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-lg dark:bg-amber-950">
                ⚙️
              </span>
              Settings
            </Link>
            <Link
              href="/dashboard/billing"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-lg dark:bg-violet-950">
                💳
              </span>
              Manage Billing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
