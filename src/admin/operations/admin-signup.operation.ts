import {
   BadRequestException,
   HttpException,
   HttpStatus,
   Injectable,
 } from '@nestjs/common';
 import mongoose, { Model } from 'mongoose';
import { AdminSignUpInput } from '../inputs/admin-signup.input';
import { InjectModel } from "@nestjs/mongoose";
import { Admin, AdminDocument } from '../models/admins.model';
import { AdminAuthResponse } from '../dto/adminAuthResponse';
import * as bcrypt from 'bcrypt';
import { addMinutes } from "date-fns";
import { generateVerificationCode } from "src/utility/auth/utilities";

@Injectable()
export class AdminSignUp{
   constructor(@InjectModel(Admin.name) private readonly userModel: Model<AdminDocument>){}

   async signUp(adminInput: AdminSignUpInput):Promise<AdminAuthResponse>{
      const findEmail =await  this.userModel.findOne({email: adminInput.email}).select('email').exec()
      if(findEmail){
         throw new BadRequestException('Email already existed')
      }
      const findPhone =await this.userModel.findOne({ phone: adminInput.phone}).select('phone').exec()
       if(findPhone) {
         throw new BadRequestException('Phone already existed')
       }

       const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(adminInput.password, salt);
   const expiresAt = addMinutes(new Date(), 10);
   const verificationCode = generateVerificationCode();
   const createAdmin = new this.userModel({
      fullName: adminInput.name,
      ...adminInput,
    password: hashedPassword,
    verificationCode: verificationCode,
    verificationCodeExpiresAt: expiresAt,
   })
   try{
      const savedAdmin =await  createAdmin.save()
      console.log(savedAdmin)
      return {
         success: true,
        message: 'Verification code sent to your email',
      }

   }catch(error){
      if (error instanceof mongoose.Error) {
         console.log(error)
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
}