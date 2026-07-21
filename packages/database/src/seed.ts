import { prisma } from "./client";
import { hashPassword } from "better-auth/crypto";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const adminName = process.env.ADMIN_NAME || "System Administrator";
  const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "Admin123!";

  console.log(`[Seed] Initializing Admin account (${adminEmail})...`);

  const hashedPassword = await hashPassword(adminPassword);

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
    include: { accounts: true },
  });

  if (existingAdmin) {
    console.log(`[Seed] Admin user (${adminEmail}) already exists. Updating password hash to Better Auth standard...`);
    
    // Update password on existing account
    await prisma.account.updateMany({
      where: { userId: existingAdmin.id, providerId: "credential" },
      data: { password: hashedPassword },
    });

    console.log(`[Seed] Admin user password hash successfully updated.`);
    return;
  }

  const admin = await prisma.user.create({
    data: {
      name: adminName,
      email: adminEmail,
      emailVerified: true,
      role: "ADMIN",
      accounts: {
        create: {
          accountId: adminEmail,
          providerId: "credential",
          password: hashedPassword,
        },
      },
    },
  });

  console.log(`[Seed] Successfully created default Admin user: ${admin.email} (ID: ${admin.id})`);
}

main()
  .catch((e) => {
    console.error("[Seed] Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
