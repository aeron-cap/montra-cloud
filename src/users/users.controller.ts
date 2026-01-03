import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import type { User } from './interfaces/user.type';
import { RefreshTokenGuard } from 'src/auth/guards/refresh-jwt.guard';

@UseGuards(RefreshTokenGuard)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    return this.userService.findMe(user.id);
  }
}
