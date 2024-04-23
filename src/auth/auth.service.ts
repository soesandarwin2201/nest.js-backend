import { Injectable } from '@nestjs/common';
import { Register } from './operations/register.operation';
import { AuthLogin } from './operations/login.operation';
import { AuthResponse } from './dto/authResponse.dto';
import { RegisterInput } from './inputs/register.input';
import { LoginInput } from './inputs/login.input';

@Injectable()
export class AuthService {
   constructor(readonly authRegister: Register, 
      readonly authLogin: AuthLogin,
   ){}

   async register(input: RegisterInput):Promise<AuthResponse>{
      return this.authRegister.register(input)
   }

   async login(input: LoginInput):Promise<AuthResponse>{
      return this.authLogin.login(input)
   }
}
