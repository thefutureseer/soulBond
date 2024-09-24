import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seeding data into PromiseEdit
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
    },
  });

  await prisma.promise.create({
    data: {
      description: "Sample promise edit",
      editedById: user.id,
      version: 1,
      status: "PENDING",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


// import prisma from "../src/utils/prisma";


// async function main() {
//   await prisma.user.createMany({
//     data: [
//       {
//         id: '1e1e1e1e-1e1e-1e1e-1e1e-1e1e1e1e1e1', // UUID for user 1
//         name: 'Alice',
//         email: 'alice@example.com',
//       },
//       {
//         id: '2e2e2e2e-2e2e-2e2e-2e2e-2e2e2e2e2e2', // UUID for user 2
//         name: 'Bob',
//         email: 'bob@example.com',
//       },
//       {
//         id: '3e3e3e3e-3e3e-3e3e-3e3e-3e3e3e3e3e3', // UUID for user 3
//         name: 'Charlie',
//         email: 'charlie@example.com',
//       },
//       {
//         id: '4e4e4e4e-4e4e-4e4e-4e4e-4e4e4e4e4e4', // UUID for user 4
//         name: 'Diana',
//         email: 'diana@example.com',
//       },
//       {
//         id: '5e5e5e5e-5e5e-5e5e-5e5e-5e5e5e5e5e5', // UUID for user 5
//         name: 'Eve',
//         email: 'eve@example.com',
//       },
//     ],
//   });
// }

// main()
//   .catch(e => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });