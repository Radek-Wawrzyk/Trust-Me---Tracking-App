import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './user.dto';
import { USER_HTTP_RESPONSE } from './user.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    const hashedPassword: string = await bcrypt.hash(user.password, 12);
    const newUser: User = this.usersRepository.create({
      ...user,
      password: hashedPassword,
    });

    try {
      return await this.usersRepository.save(newUser);
    } catch (err) {
      throw new ConflictException(USER_HTTP_RESPONSE.EMAIL_CONFLICT);
    }
  }

  async findByID(id: number): Promise<User> {
    const user: User = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException(USER_HTTP_RESPONSE.NOT_FOUND);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user: User = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) throw new NotFoundException(USER_HTTP_RESPONSE.NOT_FOUND);

    return user;
  }

  async findAll(): Promise<User[]> {
    const users: User[] = await this.usersRepository.find();

    return users;
  }

  async updatePassword(newPasssword: string, userId: number): Promise<User> {
    let user: User = await this.findByID(userId);
    const hashedPassword: string = await bcrypt.hash(newPasssword, 12);

    user = { ...user, password: hashedPassword };
    return await this.usersRepository.save(user);
  }
}
