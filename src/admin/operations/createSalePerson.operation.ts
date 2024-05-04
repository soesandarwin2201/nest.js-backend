import {
   HttpStatus,
   Injectable,
   InternalServerErrorException,
   UnauthorizedException,
 } from '@nestjs/common';
 import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from '../models/admins.model';
import { SalePerson, SalePersonDocument } from 'src/sale-person/models/saleperson.model';
import { CreateSalePersonInput } from '../inputs/createSalePerson.input';
import { AdminAuthResponse } from '../dto/adminAuthResponse';

@Injectable()
export class CreateSalePerson{
  constructor(
   @InjectModel(SalePerson.name) private salePersonModel: Model<SalePersonDocument>,
   @InjectModel(Admin.name) private adminModel: Model<AdminDocument>
  ){}

  async createSalePerson(
   adminId: string,
   saleInput: CreateSalePersonInput):Promise<AdminAuthResponse>{
    const admin = await this.adminModel.findById(adminId)
    if (!adminId && !admin) {
      throw new UnauthorizedException('You are not authorized to create the sale account');
    }

    const salePerson: any = new this.salePersonModel({
      admin: adminId,
      ...saleInput,
    });

    try{
      await salePerson.save()
      admin.salePerson = salePerson._id
      await admin.save();
      return {
        success: true,
        message: 'Sale Person Created Successfully',
      };

    }catch(error){
      console.log(error, 'Creating SalePerson Error');
      throw new InternalServerErrorException({
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}