import { Body, Controller, Post } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { RegisterDriverDto } from './register-driver.dto';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDriverDto) {
    const resp = await this.driversService.register(registerDto);

    return { message: resp };
  }
}
