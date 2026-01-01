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
import { Users } from 'src/users/users.entity';
import { TransactionDto } from 'src/dto/create-transaction';

@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private transactionService: TransactionsService) {}

  @Get('')
  getAll(@GetUser() user: Users) {
    return this.transactionService.getAllTransactions(user);
  }

  @Get('/:id')
  getOne(@GetUser() user: Users, @Param('id', ParseIntPipe) id: number) {
    return this.transactionService.getOneTransaction(user.id, id);
  }

  @Post('create')
  createTransaction(@GetUser() user: Users, @Body() data: TransactionDto) {
    return this.transactionService.createTransaction(user, data);
  }

  @Patch('edit/:id')
  editTransaction(
    @GetUser() user: Users,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: TransactionDto,
  ) {
    return this.transactionService.editTransaction(user, id, data);
  }
}
