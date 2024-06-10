import { applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const ApiCreateOrdersResponse = () => {
  return applyDecorators(
    ApiCreatedResponse({
      description: 'success create order',
      schema: {
        example: {
          message: 'success create order',
        },
      },
    }),
    ApiUnauthorizedResponse({
      description: 'unauthorized',
      schema: {
        example: {
          message: 'Unauthorized',
          statusCode: 401,
        },
      },
    }),
    ApiForbiddenResponse({
      description: 'forbidden resource',
      schema: {
        example: {
          message: 'Forbidden resource',
          error: 'Forbindden',
          statusCode: 403,
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
