import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  password: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(1)
  name?: string;
}
