import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from './dto/user-response.dto';

const salt = 10;

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<UserResponseDto> {
    const { email, password } = registerUserDto;

    const isEmailUsed = await this.userModel.findOne({ email });
    if (isEmailUsed) throw new ConflictException('Email is already used');

    const hashedPassword = await bcrypt.hash(password, salt);
    registerUserDto.password = hashedPassword;

    const newUser = await this.userModel.create(registerUserDto);
    return new UserResponseDto(newUser.toObject());
  }

  async login(loginUserDto: LoginUserDto): Promise<{ token: string }> {
    const { email, password } = loginUserDto;

    const user = await this.userModel.findOne({ email });
    if (!user) throw new BadRequestException('Wrong email or password');

    const isMatch = await bcrypt.compare(password as string, user.password);
    if (!isMatch) {
      throw new BadRequestException('Wrong email or password');
    }

    const token = await this.jwtService.signAsync({
      _id: user._id.toString(),
    });

    return { token };
  }

  async getUser(userId: string): Promise<UserResponseDto> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    return new UserResponseDto(user.toObject());
  }
}
