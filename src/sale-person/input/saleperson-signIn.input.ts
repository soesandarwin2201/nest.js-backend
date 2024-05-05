import { IsEmail,Matches , IsEmpty } from "class-validator"

export class SalePersonSignInInput{
   @IsEmpty({ message: "Need to add the email account"})
   @IsEmail(null, {message: "Invalid Email number"})
   email: string

   @IsEmpty({ message: "Need to add the password"})
   @Matches(/^(?=.*[a-z])(?=.*[A-Z])[A-Za-z0-9!@#$%^&*]*$/, {
      message: 'Wrong Password',
    })
   password: string
}