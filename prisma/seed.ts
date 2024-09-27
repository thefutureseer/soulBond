import prisma from "../src/app/utils/prisma";
import { CreateUserInput, CreatePromiseInput, StatusUs } from '../src/app/types/graphql.d';

async function main() {
  const userData: CreateUserInput = {
    name: "John Doe",
    email: "john@example.com",
  };

  const user = await prisma.user.create({
    data: userData, // Type is automatically enforced by TypeScript
  });

  const promiseData: CreatePromiseInput = {
    title: "Sample Title", // Ensure you have this field as per your schema
    description: "Sample promise edit",
    editedById: user.id,
  };

  await prisma.promise.create({
    data: {
      ...promiseData,
      status: StatusUs.PENDING, // Assuming 'status' is an enum in your 'graphql-schema'
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