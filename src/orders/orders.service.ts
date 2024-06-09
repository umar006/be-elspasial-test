import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import {
  DRIZZLE_PROVIDER,
  DrizzlePostgres,
} from 'src/database/drizzle.provider';
import { CreateOrderDto } from './create-order.dto';
import { OrderQueryParams } from './order.param';
import { Order, OrderResponse, orders } from './order.schema';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzlePostgres,
  ) {}

  async createOrder(dto: CreateOrderDto): Promise<string> {
    const order = Order.fromDto(dto);
    // TODO: get user id from auth
    order.assignUser('cUmGtg1ZSpI_EiHdySDLq');

    await this.db.insert(orders).values(order);

    return 'success create order';
  }

  async getOrderById(orderId: string): Promise<OrderResponse> {
    // TODO: get user id from auth
    const userId = 'cUmGtg1ZSpI_EiHdySDLq';

    const [order] = await this.db
      .select()
      .from(orders)
      .where(
        sql`${orders.id} = ${orderId} and ${orders.customerId} = ${userId}`,
      );
    if (!order) throw new NotFoundException('order not found');

    return order;
  }

  async getOrders(queryParams: OrderQueryParams): Promise<OrderResponse[]> {
    const query = this.db.select().from(orders);

    const orderStatus = ['waiting', 'processing', 'completed'].includes(
      queryParams.status,
    );
    if (orderStatus) query.where(eq(orders.status, queryParams.status));

    const orderList = await query;

    return orderList;
  }
}
