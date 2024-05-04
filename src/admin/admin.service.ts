import { Injectable } from '@nestjs/common';
import { AdminSignUpInput } from './inputs/admin-signup.input';
import { AdminAuthResponse } from './dto/adminAuthResponse';
import { AdminSignUp } from './operations/admin-singup.operation';

@Injectable()
export class AdminService {
   constructor(readonly adminSignup: AdminSignUp){}

   async signUp(input: AdminSignUpInput): Promise<AdminAuthResponse>{
      return this.adminSignup.signUp(input)
   }
}
