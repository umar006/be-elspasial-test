import * as bcrypt from 'bcrypt';
import { InferSelectModel } from 'drizzle-orm';
import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';
import { RegisterDriverDto } from './register-driver.dto';
import { RegisterUserDto } from './register-user.dto';

export const users = pgTable('users', {
  id: varchar('id', { length: 21 }).primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  username: varchar('username', { length: 16 }).notNull().unique(),
  password: varchar('password', { length: 60 }).notNull(),
  role: varchar('role', { length: 6 }).notNull(),
});

export class User implements InferSelectModel<typeof users> {
  id: string;
  createdAt: Date;
  username: string;
  password: string;
  role: string;

  static fromDto(dto: RegisterUserDto): User {
    const user = new User();
    user.id = nanoid();
    user.createdAt = new Date();
    user.username = dto.username;
    user.password = dto.password;
    user.role = 'user';

    return user;
  }

  async encryptPassword(): Promise<void> {
    const hashedPwd = await bcrypt.hash(this.password, 10);
    this.password = hashedPwd;
  }
}

export class Driver implements InferSelectModel<typeof users> {
  id: string;
  createdAt: Date;
  username: string;
  password: string;
  role: string;

  static fromDto(dto: RegisterDriverDto): User {
    const user = new User();
    user.id = nanoid();
    user.createdAt = new Date();
    user.username = dto.username;
    user.password = dto.password;
    user.role = 'driver';

    return user;
  }

  async encryptPassword(): Promise<void> {
    const hashedPwd = await bcrypt.hash(this.password, 10);
    this.password = hashedPwd;
  }
}
