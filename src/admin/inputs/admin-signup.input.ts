import { IsNotEmpty,IsPhoneNumber, IsEmail, Length, Validate,} from "class-validator"
import { PasswordValidator } from "src/utility/auth/password.validator"

export class AdminSignUpInput{
   @IsNotEmpty({ message: "Name is required"})
   @Length(3,20,{ message: "Name must be between 6 to 20 characters"})
   fullName: string

   @IsNotEmpty({ message: "Email is required"})
   @IsEmail(null, { message: "Invalid Email address"})
   @Length(6,40,{ message: "Email must be between 6 to 40 characters"})
   email: string

   @IsNotEmpty({ message: 'Phone number is required' })
   @IsPhoneNumber(null, { message: 'Invalid phone number' })
   phone: string;

   @IsNotEmpty({ message: "Password is required"})
   @Validate(PasswordValidator, { message: "Password need to match with requirement"})
   password: string
}