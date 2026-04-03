/**
 * Seed script — populates your local database with demo data.
 *
 * Usage:
 *   npx tsx prisma/seed.ts
 *
 * Or via the package.json script:
 *   npm run db:seed
 */

import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { hash } from "bcryptjs";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...\n");

  // Create demo users
  const password = await hash("password123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@demo.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@demo.com",
      password,
      plan: "enterprise",
      subscriptionStatus: "active",
    },
  });
  console.log(`  ✓ Created admin: ${admin.email} (enterprise plan)`);

  const pro = await prisma.user.upsert({
    where: { email: "pro@demo.com" },
    update: {},
    create: {
      name: "Pro User",
      email: "pro@demo.com",
      password,
      plan: "pro",
      subscriptionStatus: "active",
    },
  });
  console.log(`  ✓ Created pro user: ${pro.email} (pro plan)`);

  const free = await prisma.user.upsert({
    where: { email: "free@demo.com" },
    update: {},
    create: {
      name: "Free User",
      email: "free@demo.com",
      password,
      plan: "free",
    },
  });
  console.log(`  ✓ Created free user: ${free.email} (free plan)`);

  console.log("\n✅ Database seeded successfully!");
  console.log("\n  Login credentials:");
  console.log("  Email: admin@demo.com / pro@demo.com / free@demo.com");
  console.log("  Password: password123\n");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
