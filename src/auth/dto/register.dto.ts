import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsNotEmpty()
  password!: string;
}

export class MobileRegisterDto extends RegisterDto {
  @IsNotEmpty()
  randId!: string;
}
