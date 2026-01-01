import { Injectable } from '@nestjs/common';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from 'src/dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async findMe(id: number): Promise<Users | null> {
    return await this.usersRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string): Promise<Users | null> {
    return await this.usersRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email =  :email', { email })
      .getOne();
  }

  async createUser(user: RegisterDto) {
    return await this.usersRepository.save(user);
  }
}
