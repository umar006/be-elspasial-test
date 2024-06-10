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
import { LoginDriverDto } from './login-driver.dto';
import { RegisterDriverDto } from './register-driver.dto';
import { Driver, users } from './users.schema';

@Injectable()
export class DriversService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzlePostgres,
  ) {}

  async register(registerDto: RegisterDriverDto): Promise<string> {
    const driver = Driver.fromDto(registerDto);
    await driver.encryptPassword();

    try {
      await this.db.insert(users).values(driver);
    } catch (err) {
      console.error(err);
      if (err instanceof PostgresError) {
        if (err.code === '23505') {
          throw new ConflictException('username already exists');
        }
      }
      throw new InternalServerErrorException();
    }

    return 'success register driver';
  }

  async login(loginDto: LoginDriverDto): Promise<string> {
    const [driver] = await this.db
      .select()
      .from(users)
      .where(eq(users.username, loginDto.username));
    if (!driver) {
      throw new UnauthorizedException('username or password is wrong');
    }

    const comparePwd = await bcrypt.compare(loginDto.password, driver.password);
    if (!comparePwd)
      throw new UnauthorizedException('username or password is wrong');

    const payload = {
      sub: driver.id,
      username: driver.username,
      role: driver.role,
    };

    const token = await this.jwtService.signAsync(payload);

    return token;
  }
}
