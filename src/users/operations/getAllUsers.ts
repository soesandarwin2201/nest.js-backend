import { Injectable ,   InternalServerErrorException, } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../models/users.model';
import { Model } from 'mongoose';
import { UserConnection } from '../dto/user.dto';


@Injectable()
export class FetchAllUsers{
   constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}

   async getAllUser(
      authId: String,
      offset: number,
      limit: number,
   ): Promise<UserConnection>{
  try{
   const totalCount = await this.userModel.countDocuments({}).exec()
   const users = await this.userModel.find({}).exec()
   const hasNextPage = offset + limit < totalCount
   const hasPreviousPage = offset < 0

   const startCursor =
        users.length > 0 ? users[0].createdAt.toISOString() : null;
      const endCursor =
        users.length > 0
          ? users[users.length - 1].createdAt.toISOString()
          : null;

          const edges = users.map((user) => ({
            node: user,
            cursor: user.createdAt.toISOString(),
          }));

          return {
            totalCount,
            pageInfo: {
            hasNextPage,
              hasPreviousPage,
              startCursor,
              endCursor,
            },
            edges,
          };

  }catch(error){
   console.error("user fetching data gone wrong")
   throw new InternalServerErrorException('Feting User not working')
  }
   }
}