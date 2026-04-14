import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  password!: string;
}

export class MobileLoginDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  randId!: string;
}
