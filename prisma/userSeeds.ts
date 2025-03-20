// Connect to Prisma
import { PrismaClient } from '@prisma/client';

// Start a new Prisma client instance
const prisma = new PrismaClient();

async function main() {
  const userData = [

    {
      name: "Jane Smith",
      email: "1jane.smith@example.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Samuel Lee",
      email: "1samuel.lee@example.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Alex Kim",
      email: "1alex.kim@example.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    },

  ];

  let newUsers = 0;

  for (const user of userData) {
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!existingUser) {
      await prisma.user.create({ data: user });
      newUsers++;
    }
  }

  console.log(`${newUsers} new users created!`);
}

// Run the `main` function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });