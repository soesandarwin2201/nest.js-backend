import { IsNotEmpty,IsPhoneNumber, IsEmail, Length} from "class-validator"

export class CreateSalePersonInput{
   @IsNotEmpty({ message: "FullName is required"})
   @Length(3,20,{ message: "FullName must be between 6 to 20 characters"})
   name: string

   @IsNotEmpty({ message: "Email is required"})
   @IsEmail(null, { message: "Invalid Email address"})
   @Length(6,40,{ message: "Email must be between 6 to 40 characters"})
   email: string

   @IsNotEmpty({ message: 'Phone number is required' })
   @IsPhoneNumber(null, { message: 'Invalid phone number' })
   phone: string;
}