import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './models/admins.model';
import { AdminSignUp } from './operations/admin-signup.operation';
import { SignIn } from './operations/admin-signIn.operation';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema}])
  ],
  providers: [AdminService, AdminSignUp, SignIn],
  controllers: [AdminController]
})
export class AdminModule {}
