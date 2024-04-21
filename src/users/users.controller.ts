import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
   constructor(private readonly usersService: UsersService){}

   @Get()
   @ApiQuery({ name: 'offset', required: false, type: Number})
   async getAllUser() {

   }
}
