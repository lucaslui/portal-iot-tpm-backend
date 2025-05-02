import { EmailValidatorAdapter } from '@/infrastructure/validators/email-validator-adapter'
import { InvalidParamError } from '@/application/errors/invalid-param-error'
import { Validation } from '@/application/protocols/validation'

export class EmailValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidatorAdapter
  ) {}

  validate(input: any): Error {
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
