import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import {
  ApiLoginResponse,
  ApiRegisterResponse,
} from './custom-decorator.swagger';
import { LoginDto } from './login-user.dto';
import { RegisterUserDto } from './register-user.dto';
import { User } from './users.schema';
import { UsersService } from './users.service';

@ApiTags('users')
@ApiExtraModels(User)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiRegisterResponse()
  async register(
    @Body() registerDto: RegisterUserDto,
  ): Promise<{ message: string }> {
    const resp = await this.usersService.register(registerDto);
    return { message: resp };
  }

  @Post('login')
  @ApiLoginResponse()
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    const resp = await this.usersService.login(loginDto);
    return { token: resp };
  }
}
