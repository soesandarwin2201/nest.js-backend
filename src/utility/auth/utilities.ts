// generate otp code for verification 6 digit code
export const generateVerificationCode = () => {
   const code = Math.floor(100000 + Math.random() * 900000).toString();
   return code;
 };