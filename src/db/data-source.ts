import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm/browser';
import { SeederOptions } from 'typeorm-extension';

if (!process.env.DB_URL) {
  throw new Error('DB_URL is missing in .env');
}

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  url: process.env.DB_URL,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  seeds: [__dirname + '/seeds/**/*{.ts,.js}'],
  synchronize: false,
  logging: false,
};

export const AppSource = new DataSource(options);
