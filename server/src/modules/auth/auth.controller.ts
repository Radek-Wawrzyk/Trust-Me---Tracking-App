import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
} from '@nestjs/common';
import { AppRequest } from 'types/request';
import { LocalAuthGuard } from './auth.local.guard';
import { AuthService } from './auth.service';
import {
  AuthForgotPasswordDto,
  AuthRegisterDto,
  AuthResetPasswordDto,
} from './auth.dto';
import { JwtAuthGuard } from './auth.jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  loginUser(@Request() request: AppRequest) {
    return this.authService.login(request.user);
  }

  @Post('/register')
  registerUser(@Body() registerDetails: AuthRegisterDto) {
    return this.authService.register(registerDetails);
  }

  @Post('/forgot-password')
  sendForgotPassword(@Body() forgotPasswordDetails: AuthForgotPasswordDto) {
    return this.authService.createForgotPasswordLink(forgotPasswordDetails);
  }

  @Post('/reset-password')
  resetPassword(@Body() resetPasswordDetails: AuthResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDetails);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/test')
  testSecuredEndPoint() {
    return { msg: 'Hey this route is secured!' };
  }
}
