import { IsEmpty, IsPhoneNumber, IsString } from "class-validator"

export class VerifyInput{
   @IsEmpty({ message: "Phone number is required"})
   @IsPhoneNumber(null, { message: "Invalid phone number"})
   phone: string

   @IsEmpty({ message: "Password is required"})
   @IsString({})
   password: string
}