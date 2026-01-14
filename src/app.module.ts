import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm/browser';
import { TransactionsModule } from './transactions/transactions.module';
import { Users } from './users/entities/users.entity';
import { Accounts } from './accounts/entities/accounts.entity';
import { Transactions } from './transactions/entities/transactions.entity';
import { AccountClasses } from './entity_types/entities/account_class.entity';
import { CardNetworks } from './entity_types/entities/card_network.entity';
import { TransactionCategories } from './entity_types/entities/transaction_category.entity';
import { TransactionTypes } from './entity_types/entities/transaction_type.entity';

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
        entities: [
          Users,
          Accounts,
          Transactions,
          AccountClasses,
          CardNetworks,
          TransactionCategories,
          TransactionTypes,
        ],
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
