import { Controller, Post, Body,  Request, } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiTags } from '@nestjs/swagger';
import { AdminSignUpInput } from './inputs/admin-signup.input';
import { AdminAuthResponse } from './dto/adminAuthResponse';
import { AdminSignInInput } from './inputs/admin-signIn.input';
import { CreateSalePersonInput } from './inputs/createSalePerson.input';

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

   @Post('createSaleAccount')
   async createSaleAccount(@Request() req: any,
@Body('input') input: CreateSalePersonInput):Promise<AdminAuthResponse>{
   
   const adminId = req.adminId;
  return this.adminService.createSaleAccount(adminId,input)
   }
}
