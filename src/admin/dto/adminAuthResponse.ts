import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class AdminAuthResponse {
  @IsNotEmpty()
  @IsBoolean()
  success: boolean;

  @IsNotEmpty()
  @IsString()
  message: string;
}
