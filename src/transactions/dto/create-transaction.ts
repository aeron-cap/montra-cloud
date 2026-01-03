import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class TransactionDto {
  @IsOptional()
  dateTime?: Date;

  @IsNumber()
  transaction_category_id: number;

  @IsString()
  transaction_category_name: string;

  @IsNumber()
  amount: number;

  @IsString()
  transaction_name: string;

  @IsString()
  transaction_note: string;

  @IsNumber()
  transaction_type_id: number;

  @IsString()
  transaction_type_name: string;

  @IsOptional()
  @IsNumber()
  account_to_deduct_id?: number;

  @IsOptional()
  @IsString()
  account_to_deduct_name?: string;

  @IsOptional()
  @IsNumber()
  budget_id?: number;

  @IsOptional()
  @IsString()
  budget_name?: string;

  @IsOptional()
  @IsNumber()
  account_to_add_id?: number;

  @IsOptional()
  @IsString()
  account_to_add_name?: string;

  @IsOptional()
  @IsNumber()
  number_of_installment?: number;

  @IsOptional()
  @IsNumber()
  total_installment_amount?: number;

  @IsOptional()
  @IsNumber()
  fee?: number;

  @IsNotEmpty()
  @IsNumber()
  user_id: number;
}
