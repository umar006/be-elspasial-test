import { Inject, Injectable } from '@nestjs/common';
import {
  DRIZZLE_PROVIDER,
  DrizzlePostgres,
} from 'src/database/drizzle.provider';
import { CreateUserDto } from './create-user.dto';
import { User, users } from './users.schema';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzlePostgres,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = User.fromDto(createUserDto);
    await user.encryptPassword();
    await this.db.insert(users).values(user);

    return 'success create user';
  }
}
