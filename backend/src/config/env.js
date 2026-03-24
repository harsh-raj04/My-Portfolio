import dotenv from 'dotenv';

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 4000),
  mongoUri: process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/harsh-portfolio',
  clientUrls: (process.env.CLIENT_URLS ?? 'http://localhost:4200')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)
};
