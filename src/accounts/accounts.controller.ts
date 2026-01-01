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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AccountsService } from './accounts.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { AccountDto } from 'src/dto/create-account.dto';
import { Users } from 'src/users/users.entity';

@UseGuards(JwtAuthGuard)
@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @Get()
  getAll(@GetUser() user: Users) {
    return this.accountsService.getAllAccounts(user);
  }

  @Get(':id')
  getAccount(@GetUser() user: Users, @Param('id', ParseIntPipe) id: number) {
    return this.accountsService.getOneAccount(user.id, id);
  }

  @Post('create')
  createAccount(@GetUser() user: Users, @Body() data: AccountDto) {
    return this.accountsService.createAccount(user, data);
  }

  @Patch('edit/:id')
  editAccount(
    @GetUser() user: Users,
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
