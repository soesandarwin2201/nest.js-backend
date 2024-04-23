import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Register } from './operations/register.operation';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/models/users.model';
import { AuthController } from './auth.controller';
import { AuthLogin } from './operations/login.operation';


@Module({
   imports: [
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema}])
   ],
   providers: [AuthService, Register, AuthLogin],
   controllers: [AuthController]
})
export class AuthModule {}
