import { execSync } from 'child_process';
import dotenv from 'dotenv';
import path from 'path';

export default async () => {
  // Explicitly load .env.test file
  dotenv.config({ path: path.resolve(__dirname, '.env.test') });

  console.log('Resetting test database...');

  // Reset schema (drops and recreates DB structure)
  execSync(
    'npx prisma db push --force-reset --skip-generate --schema ./src/prisma/schema.prisma',
    {
      stdio: 'inherit',
    },
  );

  console.log('Seeding test database...');

  // Seed database
  execSync('npx prisma db seed --schema ./src/prisma/schema.prisma', {
    stdio: 'inherit',
  });

  console.log('Test database seeded.');
};
