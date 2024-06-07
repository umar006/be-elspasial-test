import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PostgresError } from 'postgres';
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

    try {
      await this.db.insert(users).values(user);
    } catch (err) {
      console.error(err);
      if (err instanceof PostgresError) {
        if (err.code === '23505') {
          throw new ConflictException('username already exists');
        }
      }
      throw new InternalServerErrorException();
    }

    return 'success create user';
  }
}
