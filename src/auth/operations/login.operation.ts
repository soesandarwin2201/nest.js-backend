import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';
import { addMinutes } from 'date-fns';
import { User, UserDocument } from "src/users/models/users.model";
import { AuthResponse } from "../dto/authResponse.dto";
import { LoginInput } from "../inputs/login.input";
import { generateVerificationCode } from "src/utility/auth/utilities"; 
import { InvalidCredentialsException } from "src/utility/exceptions/invalid.credential";

@Injectable()
export class AuthLogin{
  constructor(@InjectModel(User.name) private readonly userModel:Model<UserDocument>){}

  async login(loginInput:  LoginInput):Promise<AuthResponse>{
   this.validateInput(loginInput)

   const user =  await this.userModel.findOne({ phone: loginInput.phone}).exec()
   if (!user) {
      throw new InvalidCredentialsException();
    }
    const isMatch = await bcrypt.compare(loginInput.password,user.password )
    if (!isMatch) {
      throw new InvalidCredentialsException();
    }
    const verificationCode = generateVerificationCode();
    const expiresAt = addMinutes(new Date(), 10);
    try{
      const res = await this.userModel.findOneAndUpdate({
         phone: user.phone
      },{
         verificationCode: verificationCode,
         verificationCodeExpiresAt: expiresAt,
       },
       { new: true },)
       console.log(res)
       return {
         success: true,
         message: 'Verification code sent to your phone',
       };

    }catch(error){
      throw new Error('Failed to send verification code');
    }
  }



  private validateInput(loginInput: LoginInput): void {
   if (!loginInput.phone || !loginInput.password) {
     throw new InvalidCredentialsException();
   }
 }
}