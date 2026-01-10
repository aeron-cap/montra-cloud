import { Injectable } from '@nestjs/common';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async findMe(id: number): Promise<Users | null> {
    return await this.usersRepository.findOneOrFail({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async finById(id: number): Promise<Users | null> {
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

  async updateUserRefreshToken(id: number, refreshToken: string | null) {
    const result = await this.usersRepository.update({ id }, { refreshToken });

    if (result.affected === 0) {
      throw new Error(`User with ID ${id} not found during update!`);
    }
  }
}
