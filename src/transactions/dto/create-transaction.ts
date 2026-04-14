import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transactions } from '../entities/transactions.entity';

export class CreateTransactionDto implements Omit<
  Transactions,
  'id' | 'created_at' | 'updated_at'
> {
  @IsNotEmpty()
  datetime!: Date;

  @IsString()
  @IsNotEmpty()
  transaction_category!: string;

  @IsNotEmpty()
  @IsNumber()
  amount!: number;

  @IsOptional()
  @IsString()
  note?: string;

  @IsString()
  @IsNotEmpty()
  transaction_type!: string;

  @IsString()
  @IsNotEmpty()
  transaction_account!: string;

  @IsOptional()
  receiving_account?: string;

  @IsOptional()
  receiving_category?: string;

  @IsOptional()
  saving_name?: string;

  @IsOptional()
  @IsNumber()
  fee!: number;

  @IsNotEmpty()
  @IsString()
  user_id!: string;
}

export class EditTransactionDto implements Omit<
  Transactions,
  'created_at' | 'updated_at'
> {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsNotEmpty()
  datetime!: Date;

  @IsString()
  @IsNotEmpty()
  transaction_category!: string;

  @IsNotEmpty()
  @IsNumber()
  amount!: number;

  @IsOptional()
  @IsString()
  note?: string;

  @IsString()
  @IsNotEmpty()
  transaction_type!: string;

  @IsString()
  @IsNotEmpty()
  transaction_account!: string;

  @IsOptional()
  receiving_account?: string;

  @IsOptional()
  receiving_category?: string;

  @IsOptional()
  saving_name?: string;

  @IsOptional()
  @IsNumber()
  fee!: number;

  @IsNotEmpty()
  @IsString()
  user_id!: string;
}
