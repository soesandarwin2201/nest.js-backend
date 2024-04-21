import { ApiProperty } from '@nestjs/swagger';
import { User } from '../models/users.model';

export class UserEdge {
  @ApiProperty({ type: User })
  node: User;

  @ApiProperty({ type: String })
  cursor: string;
}
export class PageInfos {
  @ApiProperty({ type: Boolean })
  hasNextPage: boolean;

  @ApiProperty({ type: Boolean })
  hasPreviousPage: boolean;

  @ApiProperty({ nullable: true })
  startCursor?: string;

  @ApiProperty({ nullable: true })
  endCursor?: string;
}

export class UserConnection {
  @ApiProperty({ type: Number })
  totalCount: number;

  @ApiProperty({ type: [UserEdge] })
  edges: UserEdge[];

  @ApiProperty({ type: PageInfos })
  pageInfo: PageInfos;
}
