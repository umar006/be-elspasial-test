import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const orders = pgTable('orders', {
  id: varchar('id', { length: 21 }).primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  pickup: varchar('pickup'),
  destination: varchar('destination'),
  status: varchar('status'),
  customerId: varchar('customer_id'),
  driverId: varchar('driver_id'),
});
