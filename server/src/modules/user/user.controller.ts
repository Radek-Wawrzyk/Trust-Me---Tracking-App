import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { UserService } from './user.service';
import { AppRequest } from 'types/request';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/get')
  @UseGuards(JwtAuthGuard)
  async findUser(@Request() request: AppRequest) {
    return await this.userService.findByID(parseInt(request.user.id));
  }
}
