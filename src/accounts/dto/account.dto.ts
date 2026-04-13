import { IsNumber, IsString } from 'class-validator';
import { Account } from '../interfaces/account.type';

export class CreateAccountDto implements Omit<
  Account,
  'id' | 'created_at' | 'updated_at'
> {
  @IsString()
  name!: string;

  @IsString()
  account_type!: string;

  @IsString()
  provider!: string;

  @IsNumber()
  initial_balance!: number;

  @IsNumber()
  current_balance!: number;

  @IsString()
  user_id!: string;
}

export class EditAccountDto implements Omit<
  Account,
  'created_at' | 'updated_at'
> {
  @IsString()
  id!: string;

  @IsString()
  name!: string;

  @IsString()
  account_type!: string;

  @IsString()
  provider!: string;

  @IsNumber()
  initial_balance!: number;

  @IsNumber()
  current_balance!: number;

  @IsString()
  user_id!: string;
}
