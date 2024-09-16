import * as dotenv from 'dotenv';
dotenv.config();
import prisma from "../src/lib/prisma";

async function main() {
  // Create users
  const user1 = await prisma.user.create({
    data: { name: 'John Doe' }
  });
  
  const user2 = await prisma.user.create({
    data: { name: 'Jane Doe' }
  });

  // Create promises
  await prisma.promise.createMany({
    data: [
      { title: 'Exercise', description: 'Start a new exercise routine', creator_id: user1.id, status: 'pending' },
      { title: 'Read', description: 'Read a book for 30 minutes every day', creator_id: user2.id, status: 'completed' },
      { title: 'Learn', description: 'Learn a new skill online', creator_id: user1.id, status: 'pending' }
    ]
  });

  console.log('Seed data added.');
}

main()
  .catch(e => {
    console.error('Error seeding data:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });