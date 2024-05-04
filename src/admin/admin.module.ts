import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/models/users.model';
import { AdminSignUp } from './operations/admin-singup.operation';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema}])
  ],
  providers: [AdminService, AdminSignUp],
  controllers: [AdminController]
})
export class AdminModule {}
