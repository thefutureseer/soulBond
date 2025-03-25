import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';

const prisma = new PrismaClient();
const csvFilePath = path.join(process.cwd(), 'prisma', 'soulpromise_rows.csv'); // Correctly resolve the file path

async function seedEditsFromCSV() {
  console.log(`📥 Reading CSV file... ${csvFilePath}`);

  // Create a readable stream for the CSV file
  const readStream = fs.createReadStream(csvFilePath);

  // Parse the CSV file
  const parser = parse({ columns: true, skip_empty_lines: true });

  // Pipe the readable stream to the parser
  readStream.pipe(parser);

  // Log each row being read from the CSV file
  parser.on('data', async (row) => {
    // console.log('📊 Data read:', row);

    // Ensure we only proceed if the row has all the necessary fields
    if (row.parentId && row.editedByUserId && row.before && row.after && row.createdAt) {
      try {
        // Insert into the database
        await prisma.editslog.create({
          data: {
            parentId: row.parentId,
            editedByUserId: row.editedByUserId,
            changes: {
              before: row.before,
              after: row.after,
            },
            createdAt: new Date(row.createdAt),
          },
        });
        console.log(`✅ Successfully inserted edit log for parentId: ${row.parentId}`);
      } catch (error) {
        console.error(`❌ Error inserting row with parentId: ${row.parentId}`, error);
      }
    } else {
      console.warn(`⚠️ Missing required fields in row:`, row);
    }
  });

  // Handle end of CSV file
  parser.on('end', async () => {
    console.log('✅ Finished reading and processing the CSV file.');
    await prisma.$disconnect();
  });

  // Handle any parsing errors
  parser.on('error', (err) => {
    console.error('❌ Error parsing CSV file:', err);
  });
}

// Call the function to read the CSV and log data
seedEditsFromCSV().catch((err) => {
  console.error('❌ Error during seeding process:', err);
  process.exit(1);
});