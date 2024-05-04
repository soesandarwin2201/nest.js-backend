import { Injectable } from '@nestjs/common';
import { AdminSignUpInput } from './inputs/admin-signup.input';
import { AdminAuthResponse } from './dto/adminAuthResponse';
import { AdminSignUp } from './operations/admin-signup.operation';
import { SignIn } from './operations/admin-signIn.operation';
import { AdminSignInInput } from './inputs/admin-signIn.input';
import { CreateSalePersonInput } from './inputs/createSalePerson.input';
import { CreateSalePerson } from './operations/createSalePerson.operation';

@Injectable()
export class AdminService {
   constructor(readonly adminSignup: AdminSignUp, readonly adminSignIn: SignIn, readonly createSale: CreateSalePerson){}

   async signUp(input: AdminSignUpInput): Promise<AdminAuthResponse>{
      return this.adminSignup.signUp(input)
   }

   async signIn(input: AdminSignInInput): Promise<AdminAuthResponse>{
      return this.adminSignIn.signin(input)
   }

   async createSaleAccount(adminId: string,input: CreateSalePersonInput):Promise<AdminAuthResponse> {
      return this.createSale.createSalePerson(adminId, input)
   }
}
