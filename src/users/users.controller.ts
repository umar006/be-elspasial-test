import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './login-user.dto';
import { RegisterUserDto } from './register-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterUserDto) {
    const resp = await this.usersService.register(registerDto);
    return { message: resp };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const resp = await this.usersService.login(loginDto);
    return { token: resp };
  }
}
