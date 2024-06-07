import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: varchar('id', { length: 21 }).primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  username: varchar('username', { length: 16 }).notNull().unique(),
  password: varchar('password', { length: 30 }).notNull(),
  role: varchar('role', { length: 6 }).notNull(),
});

export type User = typeof users.$inferSelect;
