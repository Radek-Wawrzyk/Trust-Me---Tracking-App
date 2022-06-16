import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from '../user/user.entity';
import {
  AuthForgotPasswordDto,
  AuthRegisterDto,
  AuthResetPasswordDto,
  AuthTokenDto,
  AuthTokenedUserDto,
} from './auth.dto';
import { SendGridService } from '@anchan828/nest-sendgrid';
import { AUTH_EMAIL_CONFIG, AUTH_HTTP_RESPONSE } from './auth.enum';
import { ConfigService } from '@nestjs/config';
import { resetPasswordTemplate } from 'src/helpers/mailing-messages';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly sendGrid: SendGridService,
    private configService: ConfigService,
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

  async createForgotPasswordLink(
    forgotPasswordDetails: AuthForgotPasswordDto,
  ): Promise<{ status: string }> {
    const user: User = await this.userService.findByEmail(
      forgotPasswordDetails.email,
    );

    if (!user) throw new NotFoundException(AUTH_HTTP_RESPONSE.NOT_FOUND);

    const token: string = jwt.sign(
      { id: user.id },
      this.configService.get('jwt.resetSecretKey'),
      { expiresIn: '7d' },
    );

    const serverAddress = `${process.env.FRONT_END_URL}/auth/reset-password?token=${token}`;

    try {
      await this.sendGrid.send({
        to: forgotPasswordDetails.email,
        from: AUTH_EMAIL_CONFIG.FROM,
        subject: AUTH_EMAIL_CONFIG.SUBJECT,
        text: AUTH_EMAIL_CONFIG.TEXT,
        html: resetPasswordTemplate(serverAddress, user.firstName),
      });

      return { status: 'OK' };
    } catch (err) {
      throw new BadRequestException(err.response.body.errors);
    }
  }

  async resetPassword(
    resetPasswordDetails: AuthResetPasswordDto,
  ): Promise<any> {
    try {
      jwt.verify(
        resetPasswordDetails.token,
        this.configService.get('jwt.resetSecretKey'),
      );
    } catch (err) {
      return new BadRequestException(AUTH_HTTP_RESPONSE.NOT_UPDATED_PASSWORD);
    }

    const decryptedToken: jwt.JwtPayload | string = jwt.decode(
      resetPasswordDetails.token,
    ) as AuthTokenedUserDto;

    if (decryptedToken && decryptedToken.id) {
      const user: User = await this.userService.updatePassword(
        resetPasswordDetails.password,
        decryptedToken.id,
      );

      if (user && user.id) return AUTH_HTTP_RESPONSE.UPDATED_PASSWORD;
    }
  }
}
