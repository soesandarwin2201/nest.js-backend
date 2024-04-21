import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/users/models/users.model';

export class ConfirmCodeResponse {
  @ApiProperty({ type: User })
  user: User;

  @IsNotEmpty()
  @IsString()
  access_token: string;
}
