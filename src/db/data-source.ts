import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';
if (!process.env.DB_URL) {
  throw new Error('DB_URL is missing in .env');
}

export const AppSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  synchronize: false,
  logging: false,
});
