import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  type: 'user' | 'admin';
}

class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  role: 'user' | 'admin';
}

class UpdateUserPasswordDto {
  @IsNotEmpty()
  @IsString()
  password: string;
}

export { UpdateUserDto, CreateUserDto, UpdateUserPasswordDto };
