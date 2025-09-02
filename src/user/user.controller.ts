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
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  register(@Body() registerUserDto: RegisterUserDto): Promise<UserResponseDto> {
    return this.userService.register(registerUserDto);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginUserDto: LoginUserDto): Promise<{ token: string }> {
    return this.userService.login(loginUserDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findOne(@Request() req): Promise<UserResponseDto> {
    // console.log(req.user);
    // await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate delay for testing timeout interceptor

    return this.userService.getUser(req.user._id);
  }
}
