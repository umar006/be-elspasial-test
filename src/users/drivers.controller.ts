import { Body, Controller, Post } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { DriversService } from './drivers.service';
import { LoginDriverDto } from './login-driver.dto';
import { RegisterDriverDto } from './register-driver.dto';
import { Driver } from './users.schema';

@ApiTags('drivers')
@ApiExtraModels(Driver)
@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post('register')
  async register(
    @Body() registerDto: RegisterDriverDto,
  ): Promise<{ message: string }> {
    const resp = await this.driversService.register(registerDto);
    return { message: resp };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDriverDto): Promise<{ token: string }> {
    const resp = await this.driversService.login(loginDto);
    return { token: resp };
  }
}
