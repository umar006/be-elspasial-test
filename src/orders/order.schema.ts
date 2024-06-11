import { InferSelectModel } from 'drizzle-orm';
import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';
import { users } from 'src/users/users.schema';
import { CreateOrderDto } from './create-order.dto';

export const orders = pgTable('orders', {
  id: varchar('id', { length: 21 }).primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  acceptedAt: timestamp('accepted_at', { withTimezone: true }),
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
  acceptedAt: Date;
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

  assignUser?(userId: string): void {
    this.customerId = userId;
  }
}
