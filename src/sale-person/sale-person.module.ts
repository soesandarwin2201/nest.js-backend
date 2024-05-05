import { Module } from '@nestjs/common';
import { SalePersonService } from './sale-person.service';
import { SalePersonController } from './sale-person.controller';
import { GetAllSalePerson } from './operation/getAllSalePerson.operation';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from 'src/admin/models/admins.model';
import { SalePerson, SalePersonSchema } from './models/saleperson.model';
import { SalePersonSignIn } from './operation/saleperson-signin.operation';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema}]),
    MongooseModule.forFeature([{ name: SalePerson.name, schema: SalePersonSchema}]),
  ],
  providers: [SalePersonService, GetAllSalePerson, SalePersonSignIn],
  controllers: [SalePersonController]
})
export class SalePersonModule {}
