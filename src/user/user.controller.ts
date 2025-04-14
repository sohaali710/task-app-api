import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './schema/user.schema';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    return this.userService.register(registerUserDto);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginUserDto: LoginUserDto): Promise<{ token: string }> {
    return this.userService.login(loginUserDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findOne(@Request() req): Promise<User> {
    return this.userService.getUser(req.user._id);
  }
}
