import { HttpStatus, HttpException } from '@nestjs/common';

export class InvalidCredentialsException extends HttpException {
  constructor() {
    super('ဖုန်း သို့မဟုတ် Password မှားနေပါတယ်။', HttpStatus.UNAUTHORIZED);
  }
}
