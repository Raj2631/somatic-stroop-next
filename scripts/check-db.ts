import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

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
