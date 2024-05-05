import { Injectable } from '@nestjs/common';
import { GetAllSalePerson } from './operation/getAllSalePerson.operation';
import { SalePerson } from './models/saleperson.model';

@Injectable()
export class SalePersonService {
   constructor(private readonly getAllSales: GetAllSalePerson){}

   async getAllSalePerson(adminId: string, offset: number, limit: number):Promise<SalePerson[]>{
      return await this.getAllSales.getAllSalePerson(adminId,offset,limit)
   }
}
