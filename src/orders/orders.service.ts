import { Inject, Injectable } from '@nestjs/common';
import {
  DRIZZLE_PROVIDER,
  DrizzlePostgres,
} from 'src/database/drizzle.provider';
import { CreateOrderDto } from './create-order.dto';
import { Order, orders } from './order.schema';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzlePostgres,
  ) {}

  async createOrder(dto: CreateOrderDto) {
    const order = Order.fromDto(dto);
    // TODO: get user id from auth
    order.assignUser('cUmGtg1ZSpI_EiHdySDLq');

    await this.db.insert(orders).values(order);

    return 'success create order';
  }
}
