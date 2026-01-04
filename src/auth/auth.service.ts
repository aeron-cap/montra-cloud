import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/auth/dto/login.dto';
import { Users } from 'src/users/entities/users.entity';

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

    const accessToken = await this.issueToken(
      createdUser.id,
      createdUser.email,
    );
    const refreshToken = await this.issueRefreshToken(
      createdUser.id,
      createdUser.email,
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.password, dto.email);

    if (!user) return null;

    const accessToken = await this.issueToken(user.id, user.email);
    const refreshToken = await this.issueRefreshToken(user.id, user.email);
    return {
      accessToken,
      refreshToken,
    };
  }

  async logout(id: number) {
    return await this.usersService.updateUserRefreshToken(id, null);
  }

  async validateUser(password: string, email: string): Promise<Users | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user || !user.isActive) return null;

    const match = await bcrypt.compare(password, user.password);
    if (!match) return null;

    return user;
  }

  private async issueToken(sub: number, email: string): Promise<string> {
    const accessToken = await this.jwt.signAsync(
      { sub, email },
      {
        secret: this.config.getOrThrow('JWT_SECRET'),
        expiresIn: this.config.getOrThrow('JWT_EXPIRES_IN'),
      },
    );

    return accessToken;
  }

  private async issueRefreshToken(sub: number, email: string): Promise<string> {
    const refreshToken = await this.jwt.signAsync(
      { sub, email },
      {
        secret: this.config.getOrThrow('JWT_REFRESH_SECRET'),
        expiresIn: this.config.getOrThrow('JWT_REFRESH_TOKEN_EXPIRATION_MS'),
      },
    );

    const hashedToken = await bcrypt.hash(
      refreshToken,
      Number(this.config.getOrThrow('BCRYPT_SALT')),
    );

    await this.usersService.updateUserRefreshToken(sub, hashedToken);
    return refreshToken;
  }

  async refreshTokens(id: number, refreshToken: string) {
    const user = await this.usersService.finById(id);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access denied.');

    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access denied.');

    const accessToken = await this.issueToken(user.id, user.email);
    const newRefreshToken = await this.issueRefreshToken(user.id, user.email);

    return {
      accessToken,
      newRefreshToken,
    };
  }
}
