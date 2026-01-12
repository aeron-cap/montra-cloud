import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transactions } from './entities/transactions.entity';
import { Repository } from 'typeorm';
import { Transaction } from './interfaces/transaction.type';
import { TransactionDto } from 'src/transactions/dto/create-transaction';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private transactionRepository: Repository<Transactions>,
  ) {}

  async getAllTransactions(user_id: number): Promise<Transaction[]> {
    return this.transactionRepository.find({
      where: {
        user_id: user_id,
      },
    });
  }

  async getOneTransaction(user_id: number, id: number): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOneBy({
      id: id,
      user_id: user_id,
    });

    if (!transaction)
      throw new BadRequestException('Transaction does not exist.');

    return transaction;
  }

  async createTransaction(user_id: number, data: TransactionDto) {
    const transaction = this.transactionRepository.create({
      ...data,
      user_id: user_id,
    });

    return this.transactionRepository.save(transaction);
  }

  async editTransaction(user_id: number, id: number, data: TransactionDto) {
    const transactionToUpdate = await this.findOneById(user_id, id);

    if (!transactionToUpdate) {
      throw new BadRequestException('Transaction does not exist.');
    }

    Object.assign(transactionToUpdate, data);

    return this.transactionRepository.save(transactionToUpdate);
  }

  async deleteTransaction(user_id: number, id: number) {
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

  // helpers
  async findOneById(user_id: number, id: number) {
    return await this.transactionRepository
      .createQueryBuilder('transactions')
      .where('transactions.user_id = :user_id', { user_id })
      .andWhere('transactions.id = :id', { id })
      .getOne();
  }
}
