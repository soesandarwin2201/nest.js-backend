import {
   BadRequestException,
   HttpException,
   HttpStatus,
   Injectable,
 } from '@nestjs/common';
 import mongoose, { Model } from 'mongoose';
import { RegisterInput } from "../inputs/register.input";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "src/users/models/users.model";
import { AuthResponse } from "../dto/authResponse.dto";
import * as bcrypt from 'bcrypt';
import { addMinutes } from "date-fns";
import { generateVerificationCode } from "src/utility/auth/utilities";

@Injectable()
export class Register{
 constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>){}

 async register(registerInput: RegisterInput): Promise<AuthResponse>{
   const findEmail = await this.userModel.findOne({email: registerInput.email}).select('email').exec()
   if(findEmail){
      throw new BadRequestException('Email already existed')
   }

   const findPhone = await this.userModel.findOne({ phone: registerInput.phone}).select('phone').exec()
   if(findPhone){
      throw new BadRequestException("Phone already existed")
   }
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(registerInput.password, salt);
   const expiresAt = addMinutes(new Date(), 10);
   const verificationCode = generateVerificationCode();
   const createUser = new this.userModel({
    ...registerInput,
    password: hashedPassword,
    verificationCode: verificationCode,
    verificationCodeExpiresAt: expiresAt,
   })

   try {
      const savedUser = await createUser.save;
      return {
         success: true,
        message: 'Verification code sent to your phone',
      }
   }catch(error){
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
}