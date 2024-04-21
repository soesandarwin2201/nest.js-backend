import { IsNotEmpty,IsPhoneNumber, IsEmail, Length, Validate} from "class-validator"
import { PasswordValidator } from "src/utility/auth/password.validator"


export class RegisterInput{
   @IsNotEmpty({ message: "Email is required"})
   @IsEmail(null, { message: "Invalid Email address"})
   @Length(6,40,{ message: "Email must be between 6 to 40 characters"})
   email: string

   @IsNotEmpty({ message: "Phone Number is required"})
   @IsPhoneNumber(null, { message: "Invalid Phone number"})
   phone: string

   @IsNotEmpty({ message: "Password is required"})
   @Validate(PasswordValidator, { message: "Password need to match with requirement"})
   password: string
}