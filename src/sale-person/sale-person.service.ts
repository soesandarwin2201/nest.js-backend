import { Injectable } from '@nestjs/common';
import { GetAllSalePerson } from './operation/getAllSalePerson.operation';
import { SalePerson } from './models/saleperson.model';
import { SalePersonSignIn } from './operation/saleperson-signin.operation';
import { SuccessResponse } from 'src/utility/constant/Response.input';
import { SalePersonSignInInput } from './input/saleperson-signIn.input';

@Injectable()
export class SalePersonService {
   constructor(private readonly getAllSales: GetAllSalePerson,
       private readonly saleSignIn: SalePersonSignIn
   ){}

   async getAllSalePerson(adminId: string, offset: number, limit: number):Promise<SalePerson[]>{
      return await this.getAllSales.getAllSalePerson(adminId,offset,limit)
   }

   async salePersonSignIn(input: SalePersonSignInInput):Promise<SuccessResponse>{
      return await this.saleSignIn.SalePersonSignIn(input)

   }
}
