import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterDriverDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
