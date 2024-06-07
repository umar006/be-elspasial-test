import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import authConfig from './auth.config';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [authConfig.KEY],
      useFactory: (
        authCfg: ConfigType<typeof authConfig>,
      ): JwtModuleOptions => {
        const jwtSecret = authCfg.JWT_SECRET;
        let jwtExpiresInHour = parseInt(authCfg.JWT_EXPIRES_IN_HOUR);
        if (isNaN(jwtExpiresInHour)) {
          jwtExpiresInHour = 1;
        }

        return {
          secret: jwtSecret,
          signOptions: {
            expiresIn: `${jwtExpiresInHour}h`,
          },
        };
      },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
