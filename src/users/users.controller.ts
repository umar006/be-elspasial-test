import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiRegisterResponse } from './custom-decorator.swagger';
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
  @ApiOkResponse({
    description: 'success login user',
    schema: {
      example: {
        token: 'longjwttoken',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'validation error',
    schema: {
      example: {
        message: ['username should not be empty'],
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'something went wrong',
    schema: {
      example: {
        message: 'Internal Server Error',
        statusCode: 500,
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    const resp = await this.usersService.login(loginDto);
    return { token: resp };
  }
}
