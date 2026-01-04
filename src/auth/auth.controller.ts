import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import type { User } from 'src/users/interfaces/user.type';
import { RefreshTokenGuard } from './guards/refresh-jwt.guard';
import type { UserRefresh } from 'src/users/interfaces/user-refresh.type';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('logout')
  logout(@GetUser() user: User) {
    return this.authService.logout(user.id);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@GetUser() user: UserRefresh) {
    return this.authService.refreshTokens(user.id, user.refreshToken);
  }
}
