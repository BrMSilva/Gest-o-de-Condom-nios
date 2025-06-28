import 'dotenv/config';

interface Config {
  port: number;
  nodeEnv: string;
  databaseUrl: string;
  jwtSecret: string;
  clientHost: string;
  testDb: string;
}

const config: Config = {
  port: Number(process.env.SERVER_PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'secret',
  clientHost: process.env.CLIENT_HOST || 'http://localhost:5173/',
  databaseUrl: process.env.DATABASE_URL || '',
  testDb: process.env.TEST_TESTE_DB_URL || '',
};

export default config;
