import { Injectable } from '@nestjs/common';
import { FetchAllUsers } from './operations/getAllUsers';
import { UserConnection } from './dto/user.dto';


@Injectable()
export class UsersService {
   constructor(private readonly fetchAllUsers: FetchAllUsers){}

   async getAllUsers(
      authId: string,
      offset: number,
      limit: number,
   ): Promise<UserConnection>{
      return this.fetchAllUsers.getAllUser(authId, offset, limit)
   }
}
