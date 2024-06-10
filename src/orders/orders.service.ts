import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import { JwtPayload } from 'src/auth/auth.type';
import {
  DRIZZLE_PROVIDER,
  DrizzlePostgres,
} from 'src/database/drizzle.provider';
import { CreateOrderDto } from './create-order.dto';
import { OrderStatus } from './order.enum';
import { OrderQueryParams } from './order.param';
import { Order, OrderResponse, orders } from './order.schema';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzlePostgres,
  ) {}

  async createOrder(dto: CreateOrderDto, user: JwtPayload): Promise<string> {
    const order = Order.fromDto(dto);
    order.assignUser(user.sub);

    await this.db.insert(orders).values(order);

    return 'success create order';
  }

  async getOrderById(
    orderId: string,
    user: JwtPayload,
  ): Promise<OrderResponse> {
    const userId = user.sub;

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

  async acceptOrderById(orderId: string, driver: JwtPayload): Promise<string> {
    const driverId = driver.sub;

    await this.db.transaction(async (trx) => {
      let [order] = await trx
        .select()
        .from(orders)
        .where(eq(orders.id, orderId));

      if (!order) throw new NotFoundException('order is not found');

      [order] = await this.db
        .update(orders)
        .set({
          status: OrderStatus.Processing,
          driverId: driverId,
          pickedupAt: new Date(),
        })
        .where(sql`${orders.id} = ${orderId} and ${orders.driverId} is null`)
        .returning();

      if (!order)
        throw new UnprocessableEntityException(
          'order already accept by another driver',
        );
    });

    return 'success accept order';
  }
}
