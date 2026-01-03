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
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.getOrThrow<string>('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const authHeader = req.get('Authorization');
    if (!authHeader)
      throw new UnauthorizedException('Missing Authorization header');

    const refreshToken = authHeader.replace(/^Bearer\s+/i, '').trim();
    if (!refreshToken) throw new UnauthorizedException('Missing refresh token');

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

    return { id: user.id, email: user.email };
  }
}
