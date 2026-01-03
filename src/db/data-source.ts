import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Users } from '../users/entities/users.entity';
import { Accounts } from '../accounts/entities/accounts.entity';
import { Transactions } from '../transactions/entities/transactions.entity';

// const host = process.env.DB_HOST ?? 'localhost';
// const port = Number(process.env.DB_PORT ?? 5434);
// const username = process.env.DB_USERNAME ?? 'postgres';
// const password = process.env.DB_PASSWORD ?? 'password';
// const database = process.env.DB_NAME ?? 'nestjs_db';
const url = process.env.DB_URL;

export default new DataSource({
  type: 'postgres',
  // host,
  // port,
  // username,
  // password,
  // database,
  url,
  entities: [Users, Accounts, Transactions],
  migrations: ['src/db/migrations/*.ts'],
  synchronize: false,
  logging: false,
});
