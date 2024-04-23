import { ApiProperty } from '@nestjs/swagger';

export class LocationInput {
  @ApiProperty({ required: false })
  latitude?: number;
  @ApiProperty({ type: String, description: 'User ID' })
  @ApiProperty({ required: false })
  longitude?: number;
}
