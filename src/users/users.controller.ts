import { UserConnection } from './dto/user.dto';
import { Controller, Get , Query,  ParseIntPipe,Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiQuery, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
   constructor(private readonly usersService: UsersService){}

   @Get()
   @ApiQuery({ name: 'offset', required: false, type: Number})
   @ApiQuery({ name: 'limit', required: false , type: Number})
   @ApiResponse({ status: 200, type: UserConnection })
   async getAllUser(
      @Query('offset', new ParseIntPipe()) offset: number,
      @Query('limit', new ParseIntPipe()) limit: number,
      @Request() req,
   ): Promise<UserConnection> {
      const authId = req.userId;
 return this.usersService.getAllUsers(authId, offset, limit)
   }
}
