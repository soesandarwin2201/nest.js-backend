import { IsNotEmpty,IsPhoneNumber, IsEmail, Length, Validate} from "class-validator"


export class RegisterInput{
   @IsNotEmpty({ message: "Email is required"})
   @IsEmail(null, { message: "Invalid Email address"})
   @Length(6,40,{ message: "Email must be between 6 to 40 characters"})
   email: string

   @IsNotEmpty({ message: "Phone Number is required"})
   @IsPhoneNumber(null, { message: "Invalid Phone number"})
   phone: string

   @IsNotEmpty({ message: "Password is required"})
   password: string
}