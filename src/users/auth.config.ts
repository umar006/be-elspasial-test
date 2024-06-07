import { registerAs } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, validateSync } from 'class-validator';

class AuthEnv {
  @IsNotEmpty()
  JWT_SECRET: string;

  @IsNotEmpty()
  JWT_EXPIRES_IN_HOUR: string;
}

export default registerAs('auth', () => {
  const validateConfig = plainToInstance(AuthEnv, process.env);
  const errors = validateSync(validateConfig);
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validateConfig;
});
