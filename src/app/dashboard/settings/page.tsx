"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function SettingsPage() {
  const { data: session } = useSession();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const userName = session?.user?.name || "";
  const userEmail = session?.user?.email || "";
  const userPlan = session?.user?.plan || "free";
  const planLabel = userPlan.charAt(0).toUpperCase() + userPlan.slice(1);

  const handleManageBilling = async () => {
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      // Portal not available without Stripe configured
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Settings
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Manage your account settings and preferences.
        </p>
      </div>

      {/* Profile */}
      <section className="rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-white">
            Profile
          </h2>
          <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
            Update your personal information.
          </p>
        </div>
        <div className="space-y-6 p-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                defaultValue={userName}
                className="mt-1.5 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-indigo-400"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                defaultValue={userEmail}
                disabled
                className="mt-1.5 block w-full rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm text-zinc-500 shadow-sm dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-400"
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-3">
            {saved && (
              <span className="text-sm text-emerald-600 dark:text-emerald-400">
                Saved!
              </span>
            )}
            <button
              type="button"
              disabled={saving}
              onClick={() => {
                setSaving(true);
                // TODO: Wire to profile update API
                setTimeout(() => { setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2000); }, 500);
              }}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>
      </section>

      {/* Subscription */}
      <section className="rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-white">
            Subscription
          </h2>
          <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
            Manage your plan and billing.
          </p>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800">
            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                {planLabel} Plan
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {userPlan === "free"
                  ? "Free forever — upgrade for more features"
                  : `$${userPlan === "pro" ? "29" : "99"}/month`}
              </p>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
              Active
            </span>
          </div>
          <div className="mt-4 flex gap-3">
            <a
              href="/dashboard/billing"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
            >
              {userPlan === "free" ? "Upgrade Plan" : "Change Plan"}
            </a>
            {userPlan !== "free" && (
              <button
                type="button"
                onClick={handleManageBilling}
                className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Manage Billing
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="rounded-xl border border-red-200 bg-white shadow-sm dark:border-red-900 dark:bg-zinc-900">
        <div className="border-b border-red-200 px-6 py-4 dark:border-red-900">
          <h2 className="text-base font-semibold text-red-600 dark:text-red-400">
            Danger Zone
          </h2>
          <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
            Irreversible and destructive actions.
          </p>
        </div>
        <div className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm font-medium text-zinc-900 dark:text-white">
              Delete Account
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Permanently delete your account and all associated data. This
              cannot be undone.
            </p>
          </div>
          <button
            type="button"
            className="flex-shrink-0 rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
          >
            Delete Account
          </button>
        </div>
      </section>
    </div>
  );
}
