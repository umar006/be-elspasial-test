import { FactoryProvider } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import * as postgres from 'postgres';
import databaseConfig from './database.config';

export const DRIZZLE_PROVIDER = Symbol('DRIZZLE_PROVIDER');
export type DrizzlePostgres = PostgresJsDatabase;

export const drizzleProvider: FactoryProvider = {
  provide: DRIZZLE_PROVIDER,
  inject: [databaseConfig.KEY],
  useFactory: (config: ConfigType<typeof databaseConfig>) => {
    const queryClient = postgres(config.DB_URL);
    return drizzle(queryClient);
  },
};
