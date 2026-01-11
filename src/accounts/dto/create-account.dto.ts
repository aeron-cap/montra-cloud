import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AccountDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  account_class_id: number;

  @IsNotEmpty()
  @IsString()
  account_class_name: string;

  @IsNotEmpty()
  @IsNumber()
  account_type_id: number;

  @IsNotEmpty()
  @IsString()
  account_type_name: string;

  @IsNotEmpty()
  @IsNumber()
  current_balance: number;

  @IsOptional()
  @IsNumber()
  interest_rate?: number;

  @IsOptional()
  @IsNumber()
  goal_amount?: number;

  @IsOptional()
  @IsNumber()
  network_id?: number;

  @IsOptional()
  @IsString()
  network_name?: string;

  @IsOptional()
  @IsNumber()
  credit_limit?: number;

  @IsOptional()
  @IsNumber()
  cash_advance_limit?: number;

  @IsOptional()
  billing_date?: Date;

  @IsOptional()
  due_date?: Date;

  @IsOptional()
  start_date?: Date;

  @IsOptional()
  end_date?: Date;

  @IsOptional()
  @IsBoolean()
  delete_confirm?: boolean;
}
