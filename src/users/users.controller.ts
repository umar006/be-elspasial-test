import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
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
  @ApiCreatedResponse({
    description: 'success register user',
    schema: {
      example: {
        message: 'success create user',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'validate request body',
    schema: {
      example: {
        message: ['username should not be empty'],
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @ApiConflictResponse({
    description: 'username already exists',
    schema: {
      example: {
        message: 'username already exists',
        error: 'Conflict',
        statusCode: 409,
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
  async register(
    @Body() registerDto: RegisterUserDto,
  ): Promise<{ message: string }> {
    const resp = await this.usersService.register(registerDto);
    return { message: resp };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    const resp = await this.usersService.login(loginDto);
    return { token: resp };
  }
}
