import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from 'src/auth/auth.type';
import { JwtGuard } from 'src/auth/jwt.guard';
import { Roles } from 'src/auth/role.decorator';
import { Role } from 'src/auth/role.enum';
import { CreateOrderDto } from './create-order.dto';
import { OrderQueryParams } from './order.param';
import { Order } from './order.schema';
import { OrdersService } from './orders.service';
import {
  ApiCreateOrdersResponse,
  ApiGetOrderByIdResponse,
} from './custom-decorator.swagger';

@ApiTags('orders')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiCreateOrdersResponse()
  @Roles(Role.User)
  @Post()
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Req() request: RequestWithUser,
  ): Promise<{ message: string }> {
    const user = request.user;
    const resp = await this.ordersService.createOrder(createOrderDto, user);
    return { message: resp };
  }

  @ApiGetOrderByIdResponse()
  @Roles(Role.User)
  @Get(':id')
  async getOrderById(
    @Param('id') orderId: string,
    @Req() request: RequestWithUser,
  ): Promise<Order> {
    const user = request.user;
    const resp = await this.ordersService.getOrderById(orderId, user);
    return resp;
  }

  @Roles(Role.Driver)
  @Get()
  async getOrders(@Query() queryParams: OrderQueryParams): Promise<Order[]> {
    const resp = await this.ordersService.getOrders(queryParams);
    return resp;
  }

  @Roles(Role.Driver)
  @Put(':id/accept')
  async acceptOrder(
    @Param('id') id: string,
    @Req() request: RequestWithUser,
  ): Promise<{ message: string }> {
    const driver = request.user;
    const resp = await this.ordersService.acceptOrderById(id, driver);
    return { message: resp };
  }
}
