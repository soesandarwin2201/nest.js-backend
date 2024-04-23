import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterInput } from './inputs/register.input';
import { LoginInput } from './inputs/login.input';
import { AuthResponse } from './dto/authResponse.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService){}

   @Post('register')
   async register(@Body() input: RegisterInput):Promise<AuthResponse>{
      return  await this.authService.register(input)
   }

   @Post('login')
   async login(@Body() input: LoginInput):Promise<AuthResponse>{
      return await this.authService.login(input)
   }

}
