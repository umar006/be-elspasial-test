import { Inject, Injectable } from '@nestjs/common';
import { sql } from 'drizzle-orm';
import {
  DRIZZLE_PROVIDER,
  DrizzlePostgres,
} from 'src/database/drizzle.provider';
import { CreateOrderDto } from './create-order.dto';
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

    return order;
  }
}
