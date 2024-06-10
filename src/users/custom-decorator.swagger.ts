import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const ApiRegisterResponse = () => {
  return applyDecorators(
    ApiCreatedResponse({
      description: 'success register',
      schema: {
        example: {
          message: 'success create user',
        },
      },
    }),
    ApiBadRequestResponse({
      description: 'validation error',
      schema: {
        example: {
          message: ['username should not be empty'],
          error: 'Bad Request',
          statusCode: 400,
        },
      },
    }),
    ApiConflictResponse({
      description: 'username already exists',
      schema: {
        example: {
          message: 'username already exists',
          error: 'Conflict',
          statusCode: 409,
        },
      },
    }),
    ApiInternalServerErrorResponse({
      description: 'something went wrong',
      schema: {
        example: {
          message: 'Internal Server Error',
          statusCode: 500,
        },
      },
    }),
  );
};

export const ApiLoginResponse = () => {
  return applyDecorators(
    ApiOkResponse({
      description: 'success login user',
      schema: {
        example: {
          token: 'longjwttoken',
        },
      },
    }),
    ApiBadRequestResponse({
      description: 'validation error',
      schema: {
        example: {
          message: ['username should not be empty'],
          error: 'Bad Request',
          statusCode: 400,
        },
      },
    }),
    ApiUnauthorizedResponse({
      description: 'unauthorized',
      schema: {
        example: {
          message: 'username or password is wrong',
          error: 'Unauthorized',
          statusCode: 401,
        },
      },
    }),
    ApiInternalServerErrorResponse({
      description: 'something went wrong',
      schema: {
        example: {
          message: 'Internal Server Error',
          statusCode: 500,
        },
      },
    }),
  );
};
