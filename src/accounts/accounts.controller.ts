import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { AccountDto } from 'src/accounts/dto/create-account.dto';
import type { User } from 'src/users/interfaces/user.type';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @Get()
  getAll(@GetUser() user: User) {
    return this.accountsService.getAllAccounts(user);
  }

  @Get(':id')
  getAccount(@GetUser() user: User, @Param('id', ParseIntPipe) id: number) {
    return this.accountsService.getOneAccount(user.id, id);
  }

  @Post('create')
  createAccount(@GetUser() user: User, @Body() data: AccountDto) {
    return this.accountsService.createAccount(user, data);
  }

  @Patch('edit/:id')
  editAccount(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: AccountDto,
  ) {
    return this.accountsService.editAccount(user, id, data);
  }

  // @Delete('delete/:id')
  // deleteAccount(
  //   @GetUser() user: Users,
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() data: AccountDto,
  // ) {
  //   return this.accountsService.deleteAccount(user, id, data);
  // }
}
