import 'dotenv/config';

interface Config {
  port: number;
  nodeEnv: string;
  dbUrl: string;
  jwtSecret: string;
}

const config: Config = {
  port: Number(process.env.SERVER_PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  dbUrl: process.env.DATABASE_URL || '',
  jwtSecret: process.env.JWT_SECRET || 'secret',
};

export default config;
