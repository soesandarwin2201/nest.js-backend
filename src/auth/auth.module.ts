import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Register } from './operations/register.operation';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/models/users.model';
import { AuthController } from './auth.controller';


@Module({
   imports: [
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema}])
   ],
   providers: [AuthService, Register],
   controllers: [AuthController]
})
export class AuthModule {}
