import validator from 'validator'
import { EmailValidator } from '@/application/validation/protocols/email-validator'

export class EmailValidatorAdapter implements EmailValidator {
  isValid(email: string): boolean {
    return validator.isEmail(email)
  }
}
