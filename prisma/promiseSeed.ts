import prisma from '../src/app/utils/prisma';

async function main() {
  // Replace these IDs with the IDs of the existing users in your database
  const existingUserId1 = "1e1e1e1e-1e1e-1e1e-1e1e-1e1e1e1e1e1"; // Replace with actual ID of user 1
  const existingUserId2 = "2e2e2e2e-2e2e-2e2e-2e2e-2e2e2e2e2e2"; // Replace with actual ID of user 2

  // Creating promises with all fields populated
  await prisma.promise.createMany({
    data: [
      {
        title: "Promise to help with project",
        description: "I promise to assist with the ongoing project until completion.",
        editedById: existingUserId1, // Use existing user ID
        version: 1,
        status: "PENDING",
      },
      {
        title: "Commitment to health",
        description: "I promise to take care of my health by exercising regularly.",
        editedById: existingUserId1, // Use existing user ID
        version: 1,
        status: "COMPLETED",
      },
      {
        title: "Support a friend",
        description: "I promise to support my friend through difficult times.",
        editedById: existingUserId2, // Use existing user ID
        version: 1,
        status: "PENDING",
      },
      {
        title: "Learn a new skill",
        description: "I promise to learn a new programming language this year.",
        editedById: existingUserId2, // Use existing user ID
        version: 1,
        status: "BROKEN",
      },
    ],
  });

  console.log("Seeding completed!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
