import { IsPhoneNumber,Matches , IsEmpty } from "class-validator"

export class LoginInput{
   @IsEmpty({ message: "Need to add the phone number"})
   @IsPhoneNumber(null, {message: "Invalid Phone number"})
   phone: string

   @IsEmpty({ message: "Need to add the password"})
   @Matches(/^(?=.*[a-z])(?=.*[A-Z])[A-Za-z0-9!@#$%^&*]*$/, {
      message: 'Wrong Password',
    })
   password: string
}