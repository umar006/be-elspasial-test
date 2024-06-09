import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  pickup: string;

  @IsString()
  @IsNotEmpty()
  destination: string;
}
