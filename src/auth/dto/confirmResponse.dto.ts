import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/models/users.model';

export class ConfirmResponse {
  @ApiProperty({ type: User })
  user: User;

  @IsNotEmpty()
  @IsString()
  access_token: string;
}
