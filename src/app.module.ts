import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm/browser';
import { Users } from './users/users.entity';
import { Accounts } from './accounts/accounts.entity';
import { TransactionsModule } from './transactions/transactions.module';
import { Transactions } from './transactions/transactions.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService): DataSourceOptions => ({
        type: 'postgres',
        url: config.get<string>('DB_URL'),
        entities: [Users, Accounts, Transactions],
      }),
    }),
    AuthModule,
    UsersModule,
    AccountsModule,
    TransactionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
