import { Injectable } from '@nestjs/common';
import { AdminSignUpInput } from './inputs/admin-signup.input';
import { AdminAuthResponse } from './dto/adminAuthResponse';
import { AdminSignUp } from './operations/admin-signup.operation';
import { SignIn } from './operations/admin-signIn.operation';
import { AdminSignInInput } from './inputs/admin-signIn.input';

@Injectable()
export class AdminService {
   constructor(readonly adminSignup: AdminSignUp, readonly adminSignIn: SignIn){}

   async signUp(input: AdminSignUpInput): Promise<AdminAuthResponse>{
      return this.adminSignup.signUp(input)
   }

   async signIn(input: AdminSignInInput): Promise<AdminAuthResponse>{
      return this.adminSignIn.signin(input)
   }
}
