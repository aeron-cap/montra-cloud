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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TransactionsService } from './transactions.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { TransactionDto } from 'src/transactions/dto/create-transaction';
import type { User } from 'src/users/interfaces/user.type';

@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private transactionService: TransactionsService) {}

  @Get('')
  getAll(@GetUser() user: User) {
    return this.transactionService.getAllTransactions(user);
  }

  @Get('/:id')
  getOne(@GetUser() user: User, @Param('id', ParseIntPipe) id: number) {
    return this.transactionService.getOneTransaction(user.id, id);
  }

  @Post('create')
  createTransaction(@GetUser() user: User, @Body() data: TransactionDto) {
    return this.transactionService.createTransaction(user, data);
  }

  @Patch('edit/:id')
  editTransaction(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: TransactionDto,
  ) {
    return this.transactionService.editTransaction(user, id, data);
  }
}
