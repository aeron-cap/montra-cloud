import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MobileRegisterDto, RegisterDto } from 'src/auth/dto/register.dto';
import { LoginDto, MobileLoginDto } from 'src/auth/dto/login.dto';
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

  @Post('mobile_signup')
  mobile_signup(@Body() dto: MobileRegisterDto) {
    return this.authService.mobileRegister(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('mobile_login')
  mobile_login(@Body() dto: MobileLoginDto) {
    return this.authService.mobileLogin(dto);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('logout')
  logout(@GetUser() user: User) {
    return this.authService.logout(user.id);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  refreshTokens(@GetUser() user: UserRefresh) {
    return this.authService.refreshTokens(user.id);
  }
}
