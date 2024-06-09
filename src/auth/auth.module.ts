import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import authConfig from './auth.config';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
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
})
export class AuthModule {}
