import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/dto/register.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/dto/login.dto';
import { Users } from 'src/users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async register(user: RegisterDto) {
    const existingUser = await this.usersService.findOneByEmail(user.email);

    if (existingUser) {
      throw new BadRequestException('Email already has an account.');
    }

    const hash = await bcrypt.hash(
      user.password,
      Number(this.config.getOrThrow('BCRYPT_SALT')),
    );

    user.password = hash;
    const createdUser = await this.usersService.createUser(user);

    return this.issueToken(createdUser.id, createdUser.email);
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.password, dto.email);

    if (!user) return null;

    return this.issueToken(user.id, user.email);
  }

  async validateUser(password: string, email: string): Promise<Users | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user || !user.isActive) return null;

    const match = await bcrypt.compare(password, user.password);
    if (!match) return null;

    return user;
  }

  private async issueToken(
    sub: number,
    email: string,
  ): Promise<{ accessToken: string }> {
    const accessToken = await this.jwt.signAsync(
      { sub, email },
      {
        secret: this.config.getOrThrow('JWT_SECRET'),
        expiresIn: this.config.getOrThrow('JWT_EXPIRES_IN'),
      },
    );

    return {
      accessToken: accessToken,
    };
  }
}
