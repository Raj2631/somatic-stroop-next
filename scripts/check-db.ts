
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

async function main() {
  try {
    const count = await prisma.session.count();
    console.log('Successfully connected to database. Session count:', count);
  } catch (err) {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
