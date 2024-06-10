import { InferSelectModel } from 'drizzle-orm';
import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';
import { CreateOrderDto } from './create-order.dto';
import { users } from 'src/users/users.schema';

export const orders = pgTable('orders', {
  id: varchar('id', { length: 21 }).primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  pickedupAt: timestamp('pickedup_at', { withTimezone: true }),
  arrivedAt: timestamp('arrived_at', { withTimezone: true }),
  pickup: varchar('pickup').notNull(),
  destination: varchar('destination').notNull(),
  status: varchar('status').notNull().default('waiting'),
  customerId: varchar('customer_id')
    .notNull()
    .references(() => users.id),
  driverId: varchar('driver_id').references(() => users.id),
});

export class Order implements InferSelectModel<typeof orders> {
  id: string;
  createdAt: Date;
  pickedupAt: Date;
  arrivedAt: Date;
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

  assignUser(userId: string): void {
    this.customerId = userId;
  }
}

export class OrderResponse implements Partial<Order> {}
