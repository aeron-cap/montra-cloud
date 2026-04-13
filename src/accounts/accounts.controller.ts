import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { CreateAccountDto, EditAccountDto } from 'src/accounts/dto/account.dto';
import type { User } from 'src/users/interfaces/user.type';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  // TODO: update the User dto, type, and entity
  @Get()
  getAll(@GetUser() user: User) {
    return this.accountsService.getAllAccounts(user.id);
  }

  @Get(':id')
  getAccount(@GetUser() user: User, @Param('id', ParseIntPipe) id: string) {
    return this.accountsService.getOneAccount(user.id, id);
  }

  @Post('create')
  createAccount(@GetUser() user: User, @Body() data: CreateAccountDto) {
    return this.accountsService.createAccount(user.id, data);
  }

  @Patch('edit/:id')
  editAccount(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: string,
    @Body() data: EditAccountDto,
  ) {
    return this.accountsService.editAccount(user.id, id, data);
  }

  @Delete('delete/:id')
  deleteAccount(@GetUser() user: User, @Param('id', ParseIntPipe) id: string) {
    return this.accountsService.deleteAccount(user.id, id);
  }
}
