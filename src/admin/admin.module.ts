import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './models/admins.model';
import { AdminSignUp } from './operations/admin-signup.operation';
import { SignIn } from './operations/admin-signIn.operation';
import { CreateSalePerson } from './operations/createSalePerson.operation';
import { SalePerson, SalePersonSchema } from 'src/sale-person/models/saleperson.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema}]),
    MongooseModule.forFeature([{ name: SalePerson.name, schema: SalePersonSchema}]),

  ],
  providers: [AdminService, AdminSignUp, SignIn, CreateSalePerson],
  controllers: [AdminController]
})
export class AdminModule {}
