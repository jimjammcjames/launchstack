# 🚀 LaunchStack

**Ship your SaaS in days, not months.**

A production-ready Next.js SaaS starter with authentication, payments, database, dashboard, and everything you need to launch fast.

## ✨ What's Included

- **🔐 Authentication** — NextAuth.js with Google, GitHub OAuth + email/password
- **💳 Payments** — Stripe subscriptions with checkout, billing portal, webhooks
- **🗄️ Database** — Prisma ORM with SQLite (dev) / PostgreSQL (prod)
- **📊 Dashboard** — Admin dashboard with sidebar navigation
- **🎨 UI** — Tailwind CSS with dark mode support
- **📱 Responsive** — Mobile-first design throughout
- **🔒 Middleware** — Route protection for authenticated pages
- **🏗️ TypeScript** — Full type safety across the entire codebase
- **⚡ Next.js 15** — App Router, Server Components, Server Actions

## 🏁 Quick Start

```bash
git clone <your-repo-url> my-saas && cd my-saas
npm install
cp .env.example .env.local   # Edit with your API keys
npx prisma db push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 🔧 Configuration

See `.env.example` for all required environment variables. You'll need:

| Service | Variables |
|---------|-----------|
| NextAuth | `NEXTAUTH_SECRET` |
| Google OAuth | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` |
| GitHub OAuth | `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` |
| Stripe | `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET` |
| Database | `DATABASE_URL` |

## 📁 Project Structure

```
src/
├── app/
│   ├── api/auth/           # NextAuth API
│   ├── api/stripe/         # Checkout, webhook, portal
│   ├── auth/               # Sign in/up pages
│   ├── dashboard/          # Protected dashboard pages
│   └── page.tsx            # Landing page
├── components/             # Reusable UI components
├── config/                 # Plans, site metadata
└── lib/                    # Auth, Prisma, Stripe clients
```

## 🚢 Deploy

Works out of the box on **Vercel**, **Railway**, or **Render**. Push to GitHub, connect, add env vars, deploy.

## 📄 License

Premium template for unlimited personal and commercial projects. Redistribution of the template is not permitted.

---

Built with ❤️ by LaunchStack. Ship fast, scale later.
