import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiTags } from '@nestjs/swagger';
import { AdminSignUpInput } from './inputs/admin-signup.input';
import { AdminAuthResponse } from './dto/adminAuthResponse';
import { AdminSignInInput } from './inputs/admin-signIn.input';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
   constructor(readonly adminService: AdminService){
   }

   @Post('signup')
   async adminSignup(@Body() input: AdminSignUpInput):Promise<AdminAuthResponse>{
      return this.adminService.signUp(input)
   }

   @Post('signIn')
   async adminSignIn(@Body() input:AdminSignInInput):Promise<AdminAuthResponse>{
   return this.adminService.signIn(input)
   }
}
