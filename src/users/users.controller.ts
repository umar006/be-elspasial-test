import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { LoginDto } from './login.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    const resp = await this.usersService.create(createUserDto);
    return { message: resp };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const resp = await this.usersService.login(loginDto);
    return { token: resp };
  }
}
