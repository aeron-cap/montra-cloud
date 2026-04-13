import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Accounts } from './entities/accounts.entity';
import { Repository } from 'typeorm';
import { TransactionsService } from 'src/transactions/transactions.service';
import { CreateAccountDto, EditAccountDto } from './dto/account.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Accounts) private accountRepository: Repository<Accounts>,
    private transactionService: TransactionsService,
  ) {}

  async getAllAccounts(user_id: string): Promise<Accounts[]> {
    return await this.accountRepository.find({
      where: {
        user_id: user_id,
      },
    });
  }

  async getOneAccount(user_id: string, id: string): Promise<Accounts> {
    const account = await this.accountRepository.findOneBy({
      id: id,
      user_id: user_id,
    });

    if (!account) throw new BadRequestException('Account does not exist.');
    return account;
  }

  async createAccount(user_id: string, data: CreateAccountDto) {
    const existingAccount = await this.findOneByName(user_id, data.name);

    if (existingAccount) {
      throw new BadRequestException('Account name already exists.');
    }

    const account = this.accountRepository.create({
      ...data,
      user_id: user_id,
    });

    return this.accountRepository.save(account);
  }

  async editAccount(user_id: string, id: string, data: EditAccountDto) {
    const accountToUpdate = await this.findOneById(user_id, id);

    if (!accountToUpdate) {
      throw new BadRequestException('Account does not exist.');
    }

    const userId = user_id;
    const accountId = accountToUpdate.id;
    const accountName = data.name;

    const exisitingName = await this.accountRepository
      .createQueryBuilder('accounts')
      .where('accounts.user_id = :userId', { userId })
      .andWhere('accounts.id != :accountId', { accountId })
      .andWhere('accounts.name = :accountName', { accountName })
      .getOne();

    if (exisitingName) {
      throw new BadRequestException('Account name already exists.');
    }

    Object.assign(accountToUpdate, data);

    return this.accountRepository.save(accountToUpdate);
  }

  async deleteAccount(user_id: string, id: string) {
    const result = await this.accountRepository
      .createQueryBuilder('accounts')
      .softDelete()
      .where('id = :id', { id })
      .andWhere('user_id = :user_id', { user_id })
      .execute();

    if (result.affected === 0) {
      throw new BadRequestException(
        'Account not found or could not be deleted',
      );
    }

    return { message: 'Account deleted successfully' };
  }

  // helpers
  async findOneByName(user_id: string, name: string): Promise<Accounts | null> {
    return await this.accountRepository
      .createQueryBuilder('accounts')
      .where('accounts.user_id = :user_id', { user_id })
      .andWhere('accounts.name = :name', { name })
      .getOne();
  }

  async findOneById(user_id: string, id: string): Promise<Accounts | null> {
    return await this.accountRepository
      .createQueryBuilder('accounts')
      .where('accounts.user_id = :user_id', { user_id })
      .andWhere('accounts.id = :id', { id })
      .getOne();
  }
}
