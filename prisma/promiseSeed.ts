import prisma from '../src/app/utils/prisma';

async function main() {
  // Retrieve the user IDs after seeding
  const users = await prisma.user.findMany();
  
  if (users.length < 2) {
    console.error("Not enough users found. Please make sure at least two users are seeded.");
    process.exit(1);
  }

  const existingUserId1 = users[0].id;
  const existingUserId2 = users[1].id;
  const existingUserId3 = users[2].id;
  const existingUserId4 = users[3].id;


  // Creating soul promises with all fields populated
  await prisma.soulpromise.createMany({
    data: [
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
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });