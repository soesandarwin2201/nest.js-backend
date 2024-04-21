import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class AuthResponse {
  @IsNotEmpty()
  @IsBoolean()
  success: boolean;

  @IsNotEmpty()
  @IsString()
  message: string;
}
