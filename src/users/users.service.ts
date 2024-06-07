import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { PostgresError } from 'postgres';
import {
  DRIZZLE_PROVIDER,
  DrizzlePostgres,
} from 'src/database/drizzle.provider';
import { CreateUserDto } from './create-user.dto';
import { LoginDto } from './login.dto';
import { User, users } from './users.schema';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzlePostgres,
  ) {}

  async register(createUserDto: CreateUserDto) {
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

  async login(loginDto: LoginDto) {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.username, loginDto.username));
    if (!user) throw new UnauthorizedException('username or password is wrong');

    const comparePwd = await bcrypt.compare(loginDto.password, user.password);
    if (!comparePwd)
      throw new UnauthorizedException('username or password is wrong');

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };

    const token = await this.jwtService.signAsync(payload);

    return token;
  }
}
