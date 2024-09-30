import prisma from '../src/app/utils/prisma';

async function main() {
  // Create 5 users
  const users = await prisma.user.createMany({
    data: [
      {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "John Doe",
        email: "john.doe@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "223e4567-e89b-12d3-a456-426614174001",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "323e4567-e89b-12d3-a456-426614174002",
        name: "Samuel Lee",
        email: "samuel.lee@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "423e4567-e89b-12d3-a456-426614174003",
        name: "Alex Kim",
        email: "alex.kim@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "523e4567-e89b-12d3-a456-426614174004",
        name: "Maria Garcia",
        email: "maria.garcia@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  });

  console.log(`${users.count} users created!`);

  // Seed soulpromises for the created users
  await prisma.soulpromise.createMany({
    data: [
      {
        title: "Daily Meditation",
        description: "I promise to meditate for at least 10 minutes every day.",
        editedById: "123e4567-e89b-12d3-a456-426614174000",
        version: 1,
        status: "PENDING",
      },
      {
        title: "Spread Kindness",
        description: "I promise to perform one act of kindness every day.",
        editedById: "223e4567-e89b-12d3-a456-426614174001",
        version: 1,
        status: "COMPLETED",
      },
      {
        title: "Learn Patience",
        description: "I promise to be more patient and understanding with others.",
        editedById: "323e4567-e89b-12d3-a456-426614174002",
        version: 1,
        status: "PENDING",
      },
      {
        title: "Practice Gratitude",
        description: "I promise to write down three things I am grateful for every morning.",
        editedById: "423e4567-e89b-12d3-a456-426614174003",
        version: 1,
        status: "COMPLETED",
      },
      {
        title: "Nurture Relationships",
        description: "I promise to spend quality time with my loved ones every week.",
        editedById: "523e4567-e89b-12d3-a456-426614174004",
        version: 1,
        status: "BROKEN",
      },
    ],
  });

  console.log("Soul promises seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });