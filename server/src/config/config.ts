import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

interface Config {
  port: number;
  nodeEnv: string;
  databaseUrl: string;
  jwtSecret: string;
  clientHost: string;
}

const config: Config = {
  port: Number(process.env.SERVER_PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'secret',
  clientHost: process.env.CLIENT_HOST || 'http://localhost:5173/',
  databaseUrl: process.env.DATABASE_URL || '',
};

export default config;
