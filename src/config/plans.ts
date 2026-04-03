export const PLANS = {
  free: {
    name: "Free",
    description: "Get started for free",
    price: 0,
    features: ["1 project", "Basic analytics", "Community support"],
  },
  pro: {
    name: "Pro",
    description: "For growing teams",
    price: 29,
    priceId: "price_pro_monthly",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "Custom domains",
      "API access",
    ],
  },
  enterprise: {
    name: "Enterprise",
    description: "For large organizations",
    price: 99,
    priceId: "price_enterprise_monthly",
    features: [
      "Everything in Pro",
      "SSO/SAML",
      "Dedicated support",
      "SLA guarantee",
      "Custom integrations",
      "Audit logs",
    ],
  },
} as const;

export type PlanKey = keyof typeof PLANS;
