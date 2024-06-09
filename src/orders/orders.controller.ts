import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrderDto } from './create-order.dto';
import { OrderResponse } from './order.schema';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const resp = await this.ordersService.createOrder(createOrderDto);
    return { message: resp };
  }

  @Get(':id')
  async getOrderById(@Param('id') orderId: string): Promise<OrderResponse> {
    const resp = await this.ordersService.getOrderById(orderId);
    return resp;
  }

  @Get()
  async getOrders(): Promise<OrderResponse[]> {
    const resp = await this.ordersService.getOrders();
    return resp;
  }
}
