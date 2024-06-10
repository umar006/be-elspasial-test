import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

export const ApiRegisterResponse = () => {
  return applyDecorators(
    ApiCreatedResponse({
      description: 'success register driver',
      schema: {
        example: {
          message: 'success create driver',
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
