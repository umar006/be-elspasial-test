import { applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const ApiOrderErrorResponse = () => {
  return applyDecorators(
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

export const ApiCreateOrderResponse = () => {
  return applyDecorators(
    ApiCreatedResponse({
      description: 'success create order',
      schema: {
        example: {
          message: 'success create order',
        },
      },
    }),
  );
};

export const ApiGetOrderByIdResponse = () => {
  return applyDecorators(
    ApiOkResponse({
      description: 'success create order',
      schema: {
        example: {
          id: 'mgtu1ivY6vArOEB-mTk8R',
          createdAt: '2024-06-10T03:06:41.522Z',
          pickedupAt: null,
          arrivedAt: null,
          pickup: 'gombong',
          destination: 'yogyakarta',
          status: 'processing',
          customerId: 'JnUTHlNJiJ9VHOoaGu7xF',
          driverId: 'HGNmTiIRYdoNqeNn6Ef-k',
        },
      },
    }),
  );
};

export const ApiGetOrdersResponse = () => {
  return applyDecorators(
    ApiOkResponse({
      description: 'order list',
      schema: {
        example: [
          {
            id: 'mgtu1ivY6vArOEB-mTk8R',
            createdAt: '2024-06-10T03:06:41.522Z',
            pickedupAt: null,
            arrivedAt: null,
            pickup: 'gombong',
            destination: 'yogyakarta',
            status: 'waiting',
            customerId: 'JnUTHlNJiJ9VHOoaGu7xF',
            driverId: null,
          },
        ],
      },
    }),
  );
};