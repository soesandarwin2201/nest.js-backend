import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/users.model';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { FetchAllUsers } from './operations/getAllUsers';

@Module({
   imports: [
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema}])
   ],
   providers: [UsersService, FetchAllUsers],
   controllers: [UsersController],
   
})  
export class UsersModule {}
