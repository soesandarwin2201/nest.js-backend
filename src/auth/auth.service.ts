import { Injectable } from '@nestjs/common';
import { Register } from './operations/register.operation';
import { AuthResponse } from './dto/authResponse.dto';
import { RegisterInput } from './inputs/register.input';

@Injectable()
export class AuthService {
   constructor(readonly authRegister: Register){}

   async register(input: RegisterInput):Promise<AuthResponse>{
      return this.authRegister.register(input)
   }
}
