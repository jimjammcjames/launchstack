# 🚀 LaunchStack

**Ship your SaaS in days, not months.**

A production-ready Next.js SaaS starter kit with authentication, payments, database, email, dashboard, and everything you need to launch your product fast. Stop rebuilding the same boilerplate.

## ✨ What's Included

### Authentication
- **Multi-provider auth** — NextAuth.js with Google OAuth, GitHub OAuth, and email/password
- **Password hashing** — bcrypt with configurable salt rounds
- **Password reset** — Full forgot/reset password flow with secure email tokens
- **Protected routes** — Middleware-based route protection for `/dashboard/*`
- **Session management** — JWT sessions with plan and subscription status

### Payments & Billing
- **Stripe subscriptions** — Full checkout flow with multiple pricing tiers
- **Billing portal** — Stripe Customer Portal for self-service plan management
- **Webhook handling** — Idempotent webhook processing with deduplication
- **Plan management** — Free, Pro, and Enterprise tiers (easily customizable)
- **Customer creation** — Automatic Stripe customer creation on first checkout

### Database
- **Prisma ORM** — Type-safe database access with auto-generated types
- **SQLite dev / PostgreSQL prod** — Zero-config local development, production-ready
- **Schema included** — User, Account, Session, Subscription, and more
- **Seed script** — Demo data for instant local development

### Dashboard
- **Responsive sidebar** — Collapsible navigation with mobile support
- **Session-aware UI** — Real user data displayed throughout (no hardcoded placeholders)
- **Settings page** — Profile management with subscription overview
- **Billing page** — Plan comparison, upgrade flow, and Stripe portal integration
- **Dark mode** — System-aware with smooth transitions

### Email
- **Resend integration** — Transactional emails with graceful fallback
- **Email templates** — Welcome email, password reset, and easy-to-extend HTML templates
- **Non-blocking sends** — Emails don't block API responses

### Security
- **Rate limiting** — In-memory rate limiter on auth endpoints (signup, password reset)
- **Webhook idempotency** — Prevents duplicate processing of Stripe events
- **CSRF protection** — Via NextAuth's built-in token handling
- **Input validation** — Server-side validation on all API routes
- **No hardcoded secrets** — Environment-based configuration throughout

### Developer Experience
- **TypeScript** — Full type safety across the entire codebase
- **Next.js 16** — App Router, Server Components, Server Actions
- **Tailwind CSS v4** — Utility-first styling with dark mode
- **ESLint** — Pre-configured linting rules
- **30+ source files** — Complete, production-quality code

---

## 🏁 Quick Start

```bash
# Clone and install
git clone <your-repo-url> my-saas && cd my-saas
npm install

# Configure environment
cp .env.example .env.local   # Edit with your API keys

# Set up database
npx prisma db push

# (Optional) Seed demo data
npm run db:seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo Credentials (after seeding)

| Email | Password | Plan |
|-------|----------|------|
| `admin@demo.com` | `password123` | Enterprise |
| `pro@demo.com` | `password123` | Pro |
| `free@demo.com` | `password123` | Free |

---

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXTAUTH_SECRET` | ✅ | Session encryption key. Generate: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | ✅ | Your app URL (e.g., `http://localhost:3000`) |
| `DATABASE_URL` | ✅ | SQLite for dev: `file:./dev.db`, PostgreSQL for prod |
| `GOOGLE_CLIENT_ID` | For Google OAuth | Google Cloud Console credentials |
| `GOOGLE_CLIENT_SECRET` | For Google OAuth | Google Cloud Console credentials |
| `GITHUB_CLIENT_ID` | For GitHub OAuth | GitHub Developer Settings |
| `GITHUB_CLIENT_SECRET` | For GitHub OAuth | GitHub Developer Settings |
| `STRIPE_SECRET_KEY` | For payments | Stripe Dashboard → API keys |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | For payments | Stripe Dashboard → API keys |
| `STRIPE_WEBHOOK_SECRET` | For webhooks | Stripe CLI or Dashboard |
| `STRIPE_PRO_PRICE_ID` | For payments | Your Stripe Price ID for Pro plan |
| `STRIPE_ENTERPRISE_PRICE_ID` | For payments | Your Stripe Price ID for Enterprise plan |
| `RESEND_API_KEY` | For emails | [resend.com](https://resend.com) API key |
| `EMAIL_FROM` | For emails | Sender address (e.g., `noreply@yourdomain.com`) |
| `NEXT_PUBLIC_APP_URL` | ✅ | Public-facing URL for email links |

### Stripe Setup

1. Create a [Stripe account](https://stripe.com)
2. Create two Products with monthly recurring Prices in the Dashboard
3. Copy the Price IDs to `STRIPE_PRO_PRICE_ID` and `STRIPE_ENTERPRISE_PRICE_ID`
4. Update `src/config/plans.ts` with your Price IDs
5. Set up webhooks:
   ```bash
   # Local development (requires Stripe CLI)
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
6. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

### OAuth Setup

**Google:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth 2.0 credentials
3. Add `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI

**GitHub:**
1. Go to GitHub → Settings → Developer Settings → OAuth Apps
2. Set callback URL to `http://localhost:3000/api/auth/callback/github`

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/route.ts   # NextAuth handler
│   │   │   ├── signup/route.ts          # Registration (rate-limited)
│   │   │   ├── forgot-password/route.ts # Password reset request
│   │   │   └── reset-password/route.ts  # Password reset execution
│   │   └── stripe/
│   │       ├── checkout/route.ts        # Create checkout session
│   │       ├── portal/route.ts          # Stripe billing portal
│   │       └── webhook/route.ts         # Idempotent webhook handler
│   ├── auth/
│   │   ├── signin/page.tsx              # Sign in (OAuth + credentials)
│   │   ├── signup/page.tsx              # Registration
│   │   ├── forgot-password/page.tsx     # Request password reset
│   │   └── reset-password/page.tsx      # Set new password
│   ├── dashboard/
│   │   ├── layout.tsx                   # Sidebar + session-aware layout
│   │   ├── page.tsx                     # Dashboard home
│   │   ├── billing/page.tsx             # Plans + Stripe portal
│   │   └── settings/page.tsx            # Profile + subscription management
│   ├── layout.tsx                       # Root layout with providers
│   └── page.tsx                         # Landing page
├── components/
│   ├── navbar.tsx                       # Landing page navigation
│   ├── pricing-card.tsx                 # Reusable pricing component
│   └── providers.tsx                    # SessionProvider wrapper
├── config/
│   ├── plans.ts                         # Pricing tier definitions
│   └── site.ts                          # Site metadata
└── lib/
    ├── auth.ts                          # NextAuth configuration
    ├── auth-helpers.ts                  # Server-side session helpers
    ├── email.ts                         # Resend email client + templates
    ├── prisma.ts                        # Prisma client singleton
    ├── rate-limit.ts                    # In-memory rate limiter
    ├── stripe.ts                        # Stripe server client (lazy init)
    └── stripe-client.ts                 # Stripe client-side loader
```

---

## 🎨 Customization

### Pricing Plans

Edit `src/config/plans.ts` to change plan names, prices, and features:

```ts
export const PLANS = {
  free: {
    name: "Starter",
    price: 0,
    features: ["1 project", "Basic support"],
  },
  pro: {
    name: "Growth",
    price: 49,
    priceId: "price_your_stripe_price_id",
    features: ["Unlimited projects", "Priority support"],
  },
};
```

### Branding

- Update `src/config/site.ts` for site name, description, and links
- Replace the "L" logo in navbar and sidebar with your brand
- Modify `src/app/globals.css` for custom color schemes
- Update `public/` with your favicon and OG image

### Database

Switch to PostgreSQL for production by changing `DATABASE_URL`:

```env
DATABASE_URL="postgresql://user:password@host:5432/mydb"
```

Then update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
}
```

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in [Vercel](https://vercel.com)
3. Add all environment variables
4. Deploy

### Railway

1. Create a new project on [Railway](https://railway.app)
2. Add a PostgreSQL database
3. Deploy from GitHub with environment variables

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npx prisma generate && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🔒 Security Checklist

Before going to production:

- [ ] Generate a strong `NEXTAUTH_SECRET` (`openssl rand -base64 32`)
- [ ] Set `NEXTAUTH_URL` to your production domain
- [ ] Enable HTTPS
- [ ] Configure Stripe webhooks for your production domain
- [ ] Set up a proper email domain (SPF, DKIM, DMARC)
- [ ] Review and restrict OAuth redirect URIs
- [ ] Switch from SQLite to PostgreSQL
- [ ] Set up error monitoring (Sentry, LogRocket, etc.)
- [ ] Enable Stripe's fraud protection features
- [ ] Review rate limit settings for your expected traffic

---

## 🗄️ Database Commands

```bash
npm run db:push       # Push schema to database (dev)
npm run db:studio     # Open Prisma Studio (GUI)
npm run db:generate   # Regenerate Prisma client
npm run db:seed       # Seed demo data
```

---

## 📄 License

Premium template for unlimited personal and commercial projects. Redistribution of the template source code is not permitted.

---

Built with ❤️ by LaunchStack. Ship fast, scale later.
