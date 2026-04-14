import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transactions } from './entities/transactions.entity';
import { Repository } from 'typeorm';
import { Transaction } from './interfaces/transaction.type';
import {
  CreateTransactionDto,
  EditTransactionDto,
} from './dto/create-transaction';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private transactionRepository: Repository<Transactions>,
  ) {}

  async getAllTransactions(user_id: string): Promise<Transaction[]> {
    return this.transactionRepository.find({
      where: {
        user_id: user_id,
      },
    });
  }

  async getOneTransaction(user_id: string, id: string): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOneBy({
      id: id,
      user_id: user_id,
    });

    if (!transaction)
      throw new BadRequestException('Transaction does not exist.');

    return transaction;
  }

  async createTransaction(user_id: string, data: CreateTransactionDto) {
    const transaction = this.transactionRepository.create({
      ...data,
      user_id: user_id,
    });

    return this.transactionRepository.save(transaction);
  }

  async editTransaction(user_id: string, id: string, data: EditTransactionDto) {
    const transactionToUpdate = await this.findOneById(user_id, id);

    if (!transactionToUpdate) {
      throw new BadRequestException('Transaction does not exist.');
    }

    Object.assign(transactionToUpdate, data);

    return this.transactionRepository.save(transactionToUpdate);
  }

  async deleteTransaction(user_id: string, id: string) {
    const result = await this.transactionRepository
      .createQueryBuilder('transactions')
      .softDelete()
      .where('id = :id', { id })
      .andWhere('user_id = :user_id', { user_id })
      .execute();

    if (result.affected === 0) {
      throw new BadRequestException('Transaction not found or is now deleted.');
    }

    return { message: 'Transacation deleted successfully' };
  }

  async findOneById(user_id: string, id: string) {
    return await this.transactionRepository
      .createQueryBuilder('transactions')
      .where('transactions.user_id = :user_id', { user_id })
      .andWhere('transactions.id = :id', { id })
      .getOne();
  }
}
