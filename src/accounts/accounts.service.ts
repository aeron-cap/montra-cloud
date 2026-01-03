import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Accounts } from './entities/accounts.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { User } from 'src/users/interfaces/user.type';
import { AccountDto } from 'src/accounts/dto/create-account.dto';
import { TransactionsService } from 'src/transactions/transactions.service';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Accounts) private accountRepository: Repository<Accounts>,
    private transactionService: TransactionsService,
  ) {}

  async getAllAccounts(user: User): Promise<Accounts[]> {
    const user_id = user.id;
    return await this.accountRepository.find({
      where: {
        user_id: user_id,
      },
    });
  }

  async getOneAccount(user_id: number, id: number): Promise<Accounts> {
    try {
      return await this.accountRepository
        .createQueryBuilder('accounts')
        .where('accounts.user_id = :user_id', { user_id })
        .andWhere('accounts.id = :id', { id })
        .getOneOrFail();
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new BadRequestException('Account does not exist.');
      }
      throw e;
    }
  }

  async createAccount(user: User, data: AccountDto) {
    if (user.id == data.user_id) {
      const existingAccount = await this.findOneByName(user.id, data.name);

      if (existingAccount) {
        throw new BadRequestException('Account name already exists.');
      }

      const account = this.accountRepository.create({
        ...data,
      });

      return this.accountRepository.save(account);
    } else {
      throw new UnauthorizedException(
        'You are not authorized to create an account for this user.',
      );
    }
  }

  async editAccount(user: User, id: number, data: AccountDto) {
    if (user.id == data.user_id) {
      const accountToUpdate = await this.findOneById(user.id, id);

      if (!accountToUpdate) {
        throw new BadRequestException('Account does not exist.');
      }

      const userId = user.id;
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
    } else {
      throw new UnauthorizedException(
        'You are not authorized to edit the account for this user.',
      );
    }
  }

  // deleteAccount() {}

  async findOneByName(user_id: number, name: string): Promise<Accounts | null> {
    return await this.accountRepository
      .createQueryBuilder('accounts')
      .where('accounts.user_id = :user_id', { user_id })
      .andWhere('accounts.name = :name', { name })
      .getOne();
  }

  async findOneById(user_id: number, id: number): Promise<Accounts | null> {
    return await this.accountRepository
      .createQueryBuilder('accounts')
      .where('accounts.user_id = :user_id', { user_id })
      .andWhere('accounts.id = :id', { id })
      .getOne();
  }

  // checkRelatedTransactions() {}
}
