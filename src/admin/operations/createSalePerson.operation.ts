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
export class CreateSalePerson {
  constructor(
    @InjectModel(SalePerson.name) private salePersonModel: Model<SalePersonDocument>,
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
   //  private readonly mailService: MailService, // Inject your mail service
  ){}

  async createSalePerson(
    adminId: string,
    saleInput: CreateSalePersonInput): Promise<AdminAuthResponse>{
    const admin = await this.adminModel.findById(adminId)
    console.log(admin, "this is admin for test")
    if (!admin) {
      throw new UnauthorizedException('You are not authorized to create the sale account');
    }

    // Generate random password
    const generatedPassword = this.generateRandomPassword();
    console.log(generatedPassword)

    const salePerson: any = new this.salePersonModel({
      admin: adminId,
      ...saleInput,
      password: generatedPassword, // Assign generated password to sale person
    });

    try {
      await salePerson.save();
      admin.salePerson = salePerson._id;
      await admin.save();

      // Send email with generated password
      await this.sendPasswordEmail(saleInput.email, generatedPassword);

      return {
        success: true,
        message: 'Sale Person Created Successfully',
      };
    } catch (error) {
      console.log(error, 'Creating SalePerson Error');
      throw new InternalServerErrorException({
        message: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  private generateRandomPassword(): string {
   const length = 10; // Set the desired length of the random password
   const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
   const charactersLength = characters.length;
 
   let password = '';
   for (let i = 0; i < length; i++) {
     const randomIndex = Math.floor(Math.random() * charactersLength);
     password += characters.charAt(randomIndex);
   }
 
   return password;
  }

  private async sendPasswordEmail(email: string, password: string): Promise<void> {
   console.log("send code to email")
    // Implement email sending logic using your mail service
    // Send an email to the specified email address with the generated password
  }
}
