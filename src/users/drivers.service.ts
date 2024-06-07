import { Inject, Injectable } from '@nestjs/common';
import {
  DRIZZLE_PROVIDER,
  DrizzlePostgres,
} from 'src/database/drizzle.provider';
import { RegisterDriverDto } from './register-driver.dto';
import { Driver, users } from './users.schema';

@Injectable()
export class DriversService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzlePostgres,
  ) {}

  async register(registerDto: RegisterDriverDto) {
    const driver = Driver.fromDto(registerDto);
    await driver.encryptPassword();

    await this.db.insert(users).values(driver);

    return 'success register driver';
  }
}
