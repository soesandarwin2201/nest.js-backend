import {
   HttpException,
   HttpStatus,
   Injectable,
 } from '@nestjs/common';
 import mongoose, { Model } from 'mongoose';
 import { SalePerson, SalePersonDocument } from '../models/saleperson.model';
 import { SalePersonSignInInput } from '../input/saleperson-signIn.input';
 import { SuccessResponse } from 'src/utility/constant/Response.input';
 import { InjectModel } from "@nestjs/mongoose";
 import * as bcrypt from 'bcrypt';
import { addMinutes } from "date-fns";
import { generateVerificationCode } from "src/utility/auth/utilities";
import { InvalidCredentialsException } from "src/utility/exceptions/invalid.credential";

@Injectable()
export class SalePersonSignIn{
  constructor(@InjectModel(SalePerson.name) private saleModel: Model<SalePersonDocument>){}

  async SalePersonSignIn(input: SalePersonSignInInput):Promise<SuccessResponse>{
    this.validateInput(input)
    const saleperson = await this.saleModel.findOne({ email: input.email}).exec()
    console.log(saleperson, "this is sale person login ")
    if (!saleperson) {
      throw new InvalidCredentialsException();
    }
    const isMatch = await bcrypt.compare(input.password, saleperson.password)
    console.log("is match or not", isMatch)
    if(!isMatch){
      throw new InvalidCredentialsException();
    }
    const verificationCode = generateVerificationCode();
       const expiresAt = addMinutes(new Date(), 10);
       try{
         const res = await this.saleModel.findOneAndUpdate({
            phone: saleperson.phone
         }, {
            verificationCode: verificationCode,
            verificationCodeExpiresAt: expiresAt,
         }, {
            new: true
         });
         console.log(res)
          return {
            success: true,
            message: 'Verification code sent to your phone',
          };
   
       }catch(error){
         console.log(input)
         console.log(error)
         if (error instanceof mongoose.Error) {
            throw new HttpException(
              error.message,
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          } else {
            throw new HttpException(
              'Failed to send verification code',
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }
       }

  }

  private validateInput(input: SalePersonSignInInput): void {
   if (!input.email || !input.password) {
     throw new InvalidCredentialsException();
   }
 }
}