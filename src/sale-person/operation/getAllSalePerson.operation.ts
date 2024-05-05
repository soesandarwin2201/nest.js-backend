import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { SalePerson, SalePersonDocument } from '../models/saleperson.model';

@Injectable()
export class GetAllSalePerson{
   constructor(
@InjectModel(SalePerson.name) private saleModel: Model<SalePersonDocument> ){}

async getAllSalePerson(
   adminId: string,
   offset: number,
   limit: number,
):Promise<SalePerson[]>{
   try{
      // const sortCriteria: any = {};
      const salePeople = await this.saleModel.find({}).populate('admin', '_id name').skip(offset)
      .limit(limit)
      .lean()
      .exec();
      console.log(salePeople)
      return salePeople;
   }catch(error){
 // Log the error for debugging purposes
 console.log(error)
 console.error('Error in getAllMarkets:', error);

 // Handle unauthorized access separately
 if (error instanceof UnauthorizedException) {
   throw new UnauthorizedException('Unauthorized access');
 }

 // For other errors, return a generic Internal Server Error
 throw new InternalServerErrorException('Internal Server Error');
   }
}

}