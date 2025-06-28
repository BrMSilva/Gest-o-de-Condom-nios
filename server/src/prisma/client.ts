import { PrismaClient } from '@prisma/client';
import config from '../config/config.ts';

// configure prisma client instance with different db for testing
const dbUrl =
  config.nodeEnv === 'development' ? config.databaseUrl : config.testDb;

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: dbUrl,
    },
  },
});

export default prisma;
