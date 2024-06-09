import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateOrderDto } from './create-order.dto';
import { OrderQueryParams } from './order.param';
import { OrderResponse } from './order.schema';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<{ message: string }> {
    const resp = await this.ordersService.createOrder(createOrderDto);
    return { message: resp };
  }

  @Get(':id')
  async getOrderById(@Param('id') orderId: string): Promise<OrderResponse> {
    const resp = await this.ordersService.getOrderById(orderId);
    return resp;
  }

  @Get()
  async getOrders(
    @Query() queryParams: OrderQueryParams,
  ): Promise<OrderResponse[]> {
    const resp = await this.ordersService.getOrders(queryParams);
    return resp;
  }

  @Put(':id/accept')
  async acceptOrder(@Param('id') id: string): Promise<{ message: string }> {
    const resp = await this.ordersService.acceptOrderById(id);
    return { message: resp };
  }
}
