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

  // Retrieve the user IDs after seeding
  const allUsers = await prisma.user.findMany();

  if (allUsers.length < 4) { // Ensure there are at least 4 users
    console.error("Not enough users found. Please make sure at least four users are seeded.");
    process.exit(1);
  }

  const existingUserId1 = allUsers[0].id;
  const existingUserId2 = allUsers[1].id;
  const existingUserId3 = allUsers[2].id;
  const existingUserId4 = allUsers[3].id;

  // Seed soul promises for the created users
  await prisma.soulpromise.createMany({
    data: [
      {
        title: "Daily Meditation",
        description: "I promise to meditate for at least 10 minutes every day.",
        editedById: existingUserId1,
        version: 1,
        status: "PENDING",
      },
      {
        title: "Spread Kindness",
        description: "I promise to perform one act of kindness every day.",
        editedById: existingUserId2,
        version: 1,
        status: "COMPLETED",
      },
      {
        title: "Learn Patience",
        description: "I promise to be more patient and understanding with others.",
        editedById: existingUserId3,
        version: 1,
        status: "PENDING",
      },
      {
        title: "Practice Gratitude",
        description: "I promise to write down three things I am grateful for every morning.",
        editedById: existingUserId4,
        version: 1,
        status: "COMPLETED",
      },
      {
        title: "Nurture Relationships",
        description: "I promise to spend quality time with my loved ones every week.",
        editedById: existingUserId1,
        version: 1,
        status: "BROKEN",
      },
      // Additional soul promises using existing user IDs
      {
        title: "Promise to Be Present",
        description: "I vow to remain fully present in each moment, embracing the now and letting go of distractions.",
        editedById: existingUserId1,
        version: 1,
        status: "PENDING",
      },
      {
        title: "Promise of Kindness",
        description: "I commit to showing kindness to myself and others, even when it feels difficult.",
        editedById: existingUserId2,
        version: 1,
        status: "PENDING",
      },
      {
        title: "Journey of Self-Love",
        description: "I promise to treat myself with love, respect, and compassion, recognizing my own worth.",
        editedById: existingUserId3,
        version: 2,
        status: "COMPLETED",
      },
      {
        title: "Embracing Silence",
        description: "I commit to finding moments of silence each day to connect with my inner being and listen to the whispers of my soul.",
        editedById: existingUserId4,
        version: 1,
        status: "COMPLETED",
      },
      {
        title: "Gratitude Journal",
        description: "I promise to write down three things I am grateful for every day, focusing on the beauty of life.",
        editedById: existingUserId1,
        version: 1,
        status: "PENDING",
      },
      {
        title: "Supporting the Earth",
        description: "I vow to reduce waste, recycle more, and honor Mother Earth by being mindful of my consumption.",
        editedById: existingUserId2,
        version: 1,
        status: "BROKEN", // Let's assume the user forgot about it once but aims to restart
      },
      {
        title: "Honoring My Ancestors",
        description: "I promise to learn more about my ancestors' stories, preserving their memories and wisdom.",
        editedById: existingUserId3,
        version: 3,
        status: "COMPLETED",
      },
      {
        title: "Expressing Creativity",
        description: "I commit to engaging in a creative activity every week, whether it's painting, writing, or music.",
        editedById: existingUserId4,
        version: 1,
        status: "PENDING",
      },
      {
        title: "Mindful Eating",
        description: "I promise to eat each meal with mindfulness, savoring every bite and being grateful for the nourishment.",
        editedById: existingUserId2,
        version: 1,
        status: "PENDING",
      },
      {
        title: "Connecting with Nature",
        description: "I commit to spending at least one hour in nature every week, reconnecting with the earth's energy.",
        editedById: existingUserId1,
        version: 1,
        status: "PENDING",
      },
    ],
  });

  console.log("Seeding completed with soulful promises!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });