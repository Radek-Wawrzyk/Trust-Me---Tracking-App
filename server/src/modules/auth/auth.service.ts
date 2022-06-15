import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';
import { AuthRegisterDto, AuthTokenDto, AuthTokenedUserDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<AuthTokenedUserDto> {
    const user: User = await this.userService.findByEmail(email);

    if (user && bcrypt.compareSync(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user;
      return rest;
    }

    return null;
  }

  async login(user: AuthTokenedUserDto): Promise<AuthTokenDto> {
    return {
      access_token: this.jwtService.sign(user),
    };
  }

  async register(user: AuthRegisterDto): Promise<User> {
    return await this.userService.create(user);
  }
}
