import {
   BadRequestException,
   HttpException,
   HttpStatus,
   Injectable,
 } from '@nestjs/common';
 import mongoose, { Model } from 'mongoose';
 import { User,UserDocument } from 'src/users/models/users.model';
 import { AdminSignInInput } from '../inputs/admin-signIn.input';
 import { AdminAuthResponse } from '../dto/adminAuthResponse';
 import { InjectModel } from "@nestjs/mongoose";
 import * as bcrypt from 'bcrypt';
import { addMinutes } from "date-fns";
import { generateVerificationCode } from "src/utility/auth/utilities";
import { InvalidCredentialsException } from "src/utility/exceptions/invalid.credential";

@Injectable()
export class SignIn{
   constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>){}

   async signin(adminInput: AdminSignInInput):Promise<AdminAuthResponse>{
  this.validateInput(adminInput)
  const user = await this.userModel.findOne({ phone: adminInput.phone}).select('phone').exec()
  if (!user) {
   throw new InvalidCredentialsException();
 }
 const isMatch = await bcrypt.compare(adminInput.password, user.password)
 if(!isMatch){
   throw new InvalidCredentialsException();
 }
 const verificationCode = generateVerificationCode();
    const expiresAt = addMinutes(new Date(), 10);
    try{
      const res = await this.userModel.findOneAndUpdate({
         phone: user.phone
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


   private validateInput(adminInput: AdminSignInInput): void {
      if (!adminInput.phone || !adminInput.password) {
        throw new InvalidCredentialsException();
      }
    }
}