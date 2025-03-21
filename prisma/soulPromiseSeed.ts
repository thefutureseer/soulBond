import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedSoulPromises() {
  const soulPromisesData = [
    {
      title: "Daily Meditation",
      description: "I promise to meditate for at least 10 minutes every day.",
    },
    {
      title: "Spread Kindness",
      description: "I promise to perform one act of kindness every day.",
    },
    {
      title: "Learn Patience",
      description: "I promise to be more patient and understanding with others.",
    },
  ];

  const existingTitles = new Set(
    (await prisma.soulpromise.findMany({ select: { title: true } })).map(
      (sp) => sp.title
    )
  );

  const newPromises = soulPromisesData.filter(
    (promise) => !existingTitles.has(promise.title)
  );

  if (newPromises.length > 0) {
    await prisma.soulpromise.createMany({ data: newPromises });
  }

  console.log(`Seeding completed with ${newPromises.length} new soulful promises!`);
}

seedSoulPromises()
  .catch((error) => console.error("Error seeding soul promises:", error))
  .finally(async () => {
    await prisma.$disconnect();
  });
