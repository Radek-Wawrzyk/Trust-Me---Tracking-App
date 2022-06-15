import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

class AuthLoginDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, {
    message: 'Your password is too weak',
  })
  password: string;
}

class AuthRegisterDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, {
    message: 'Your password is too weak',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  role: 'user' | 'admin';
}

class AuthTokenDto {
  access_token: string;
}

class AuthTokenedUserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  iat?: number;
  exp?: number;
}

class AuthForgotPasswordDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

class AuthResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, {
    message: 'Your password is too weak',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}

class AuthDecryptedResetPasswordTokenDto {
  id: number;
  iat: number;
  exp: number;
}

export {
  AuthLoginDto,
  AuthRegisterDto,
  AuthTokenDto,
  AuthTokenedUserDto,
  AuthForgotPasswordDto,
  AuthResetPasswordDto,
  AuthDecryptedResetPasswordTokenDto,
};
