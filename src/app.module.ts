import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import authConfig from './auth/auth.config';
import databaseConfig from './database/database.config';
import { DatabaseModule } from './database/database.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig],
    }),
    DatabaseModule,
    UsersModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
