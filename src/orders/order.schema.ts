import { InferSelectModel } from 'drizzle-orm';
import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';
import { CreateOrderDto } from './create-order.dto';

export const orders = pgTable('orders', {
  id: varchar('id', { length: 21 }).primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  pickup: varchar('pickup'),
  destination: varchar('destination'),
  status: varchar('status'),
  customerId: varchar('customer_id'),
  driverId: varchar('driver_id'),
});

export class Order implements InferSelectModel<typeof orders> {
  id: string;
  createdAt: Date;
  pickup: string;
  destination: string;
  status: string;
  customerId: string;
  driverId: string;

  static fromDto(dto: CreateOrderDto): Order {
    const order = new Order();
    order.id = nanoid();
    order.createdAt = new Date();
    order.pickup = dto.pickup;
    order.destination = dto.destination;

    return order;
  }
}
