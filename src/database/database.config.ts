import { registerAs } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, validateSync } from 'class-validator';

class DatabaseEnv {
  @IsString()
  @IsNotEmpty()
  DB_URL: string;
}

export default registerAs('database', () => {
  const validateConfig = plainToInstance(DatabaseEnv, process.env);
  const errors = validateSync(validateConfig);
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validateConfig;
});
