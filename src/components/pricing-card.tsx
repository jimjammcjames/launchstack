"use client";

import { useState } from "react";

interface PricingCardProps {
  name: string;
  description: string;
  price: number;
  priceId?: string;
  features: readonly string[];
  popular?: boolean;
}

export default function PricingCard({
  name,
  description,
  price,
  priceId,
  features,
  popular = false,
}: PricingCardProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!priceId) return;
    setLoading(true);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, planName: name.toLowerCase() }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout error:", data.error);
      }
    } catch (error) {
      console.error("Checkout request failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const isFree = price === 0;

  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-8 ${
        popular
          ? "border-blue-500 shadow-lg shadow-blue-500/10"
          : "border-gray-200 dark:border-gray-800"
      }`}
    >
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-4 py-1 text-xs font-semibold text-white">
          Most Popular
        </span>
      )}

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {name}
      </h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {description}
      </p>

      <div className="mt-6 flex items-baseline gap-1">
        <span className="text-4xl font-bold text-gray-900 dark:text-white">
          ${price}
        </span>
        {!isFree && (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            /month
          </span>
        )}
      </div>

      <ul className="mt-8 flex-1 space-y-3">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
          >
            <svg
              className="mt-0.5 h-4 w-4 shrink-0 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <button
        onClick={handleCheckout}
        disabled={isFree || loading}
        className={`mt-8 w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
          popular
            ? "bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300"
            : "bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-400 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 dark:disabled:bg-gray-600"
        } disabled:cursor-not-allowed`}
      >
        {loading ? "Redirecting…" : isFree ? "Current Plan" : `Get ${name}`}
      </button>
    </div>
  );
}
