import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transactions } from './transactions.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { User } from 'src/users/user.type';
import { Transaction } from './transaction.type';
import { TransactionDto } from 'src/dto/create-transaction';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private transactionRepository: Repository<Transactions>,
  ) {}

  async getAllTransactions(user: User): Promise<Transaction[]> {
    const user_id = user.id;
    return this.transactionRepository.find({
      where: {
        user_id: user_id,
      },
    });
  }

  async getOneTransaction(user_id: number, id: number): Promise<Transaction> {
    try {
      return this.transactionRepository
        .createQueryBuilder('transactions')
        .where('transactions.user_id = :user_id', { user_id })
        .andWhere('transactions.id = :id', { id })
        .getOneOrFail();
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new BadRequestException('Transaction does not exist.');
      }
      throw e;
    }
  }

  async createTransaction(user: User, data: TransactionDto) {
    if (user.id == data.user_id) {
      const transaction = this.transactionRepository.create({
        ...data,
      });

      return this.transactionRepository.save(transaction);
    } else {
      throw new UnauthorizedException(
        'You are not authorized to create a transaction for this user.',
      );
    }
  }

  async editTransaction(user: User, id: number, data: TransactionDto) {
    if (user.id == data.user_id) {
      const transactionToUpdate = await this.findOneById(user.id, id);

      if (!transactionToUpdate) {
        throw new BadRequestException('Transaction does not exist.');
      }

      Object.assign(transactionToUpdate, data);

      return this.transactionRepository.save(transactionToUpdate);
    } else {
      throw new UnauthorizedException(
        'You are not authorized to edit the transaction for this user.',
      );
    }
  }

  // deleteTransaction() {}

  async findOneById(user_id: number, id: number) {
    return await this.transactionRepository
      .createQueryBuilder('transactions')
      .where('transactions.user_id = :user_id', { user_id })
      .andWhere('transactions.id = :id', { id })
      .getOne();
  }
}
