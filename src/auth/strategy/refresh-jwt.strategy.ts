import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Users } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from './jwt.payload';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private config: ConfigService,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req.get('x-refresh-token') ?? null,
      ]),
      secretOrKey: config.getOrThrow<string>('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const refreshToken = req.get('x-refresh-token');
    if (!refreshToken)
      throw new UnauthorizedException('Missing Refresh Token.');

    const id = payload.sub;
    const user = await this.usersRepository
      .createQueryBuilder('users')
      .where('users.id =  :id', { id })
      .getOne();

    if (!user) throw new UnauthorizedException('User not found');
    if (!user.refreshToken)
      throw new UnauthorizedException('Refresh token not set');

    const ok = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!ok) throw new UnauthorizedException('Invalid refresh token');

    return { id: user.id, email: user.email, refreshToken: refreshToken };
  }
}
