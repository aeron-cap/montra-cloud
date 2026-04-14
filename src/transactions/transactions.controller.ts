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
import { TransactionsService } from './transactions.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import type { User } from 'src/users/interfaces/user.type';
import {
  CreateTransactionDto,
  EditTransactionDto,
} from './dto/create-transaction';

@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private transactionService: TransactionsService) {}

  @Get('')
  getAll(@GetUser() user: User) {
    return this.transactionService.getAllTransactions(user.id);
  }

  @Get('/:id')
  getOne(@GetUser() user: User, @Param('id', ParseIntPipe) id: string) {
    return this.transactionService.getOneTransaction(user.id, id);
  }

  @Post('create')
  createTransaction(@GetUser() user: User, @Body() data: CreateTransactionDto) {
    return this.transactionService.createTransaction(user.id, data);
  }

  @Patch('edit/:id')
  editTransaction(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: string,
    @Body() data: EditTransactionDto,
  ) {
    return this.transactionService.editTransaction(user.id, id, data);
  }

  @Delete('delete/:id')
  deleteTransaction(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: string,
  ) {
    return this.transactionService.deleteTransaction(user.id, id);
  }
}
