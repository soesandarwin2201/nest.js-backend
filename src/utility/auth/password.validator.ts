import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'passwordComplexity', async: false })
export class PasswordValidator implements ValidatorConstraintInterface {
  validate(password: string, args: ValidationArguments): boolean {
    const errors = [];

    // Check minimum length
    errors.push({ title: 'Must be at least 8 characters long', isValid: password.length >= 8 });

    // Check for uppercase letter
    errors.push({ title: 'Include at least one uppercase letter', isValid: /[A-Z]/.test(password) });

    // Check for lowercase letter
    errors.push({ title: 'Include at least one lowercase letter', isValid: /[a-z]/.test(password) });

    // Check for number
    errors.push({ title: 'Include at least one number', isValid: /\d/.test(password) });

    // Check for special character
    errors.push({ title: 'Include at least one special character', isValid: /[!@#$%^&*]/.test(password) });

    return errors.every(error => error.isValid); // Return true if all errors are valid
  }

  defaultMessage(args: ValidationArguments) {
    return 'Password must meet the specified complexity requirements';
  }
}