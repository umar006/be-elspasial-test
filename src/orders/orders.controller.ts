import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt.guard';
import { Roles } from 'src/auth/role.decorator';
import { Role } from 'src/auth/role.enum';
import { CreateOrderDto } from './create-order.dto';
import { OrderQueryParams } from './order.param';
import { OrderResponse } from './order.schema';
import { OrdersService } from './orders.service';

@UseGuards(JwtGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Roles(Role.User)
  @Post()
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<{ message: string }> {
    const resp = await this.ordersService.createOrder(createOrderDto);
    return { message: resp };
  }

  @Roles(Role.User)
  @Get(':id')
  async getOrderById(@Param('id') orderId: string): Promise<OrderResponse> {
    const resp = await this.ordersService.getOrderById(orderId);
    return resp;
  }

  @Roles(Role.Driver)
  @Get()
  async getOrders(
    @Query() queryParams: OrderQueryParams,
  ): Promise<OrderResponse[]> {
    const resp = await this.ordersService.getOrders(queryParams);
    return resp;
  }

  @Roles(Role.Driver)
  @Put(':id/accept')
  async acceptOrder(@Param('id') id: string): Promise<{ message: string }> {
    const resp = await this.ordersService.acceptOrderById(id);
    return { message: resp };
  }
}
