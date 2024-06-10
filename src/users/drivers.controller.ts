import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DriversService } from './drivers.service';
import { LoginDriverDto } from './login-driver.dto';
import { RegisterDriverDto } from './register-driver.dto';
import { Driver } from './users.schema';

@ApiTags('drivers')
@ApiExtraModels(Driver)
@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post('register')
  @ApiCreatedResponse({
    description: 'success register driver',
    schema: {
      example: {
        message: 'success create driver',
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
    @Body() registerDto: RegisterDriverDto,
  ): Promise<{ message: string }> {
    const resp = await this.driversService.register(registerDto);
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
  async login(@Body() loginDto: LoginDriverDto): Promise<{ token: string }> {
    const resp = await this.driversService.login(loginDto);
    return { token: resp };
  }
}
