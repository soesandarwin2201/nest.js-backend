import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class SuccessResponse {
  @IsNotEmpty()
  @IsBoolean()
  success: boolean;

  @IsNotEmpty()
  @IsString()
  message: string;
}
