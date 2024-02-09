import { MissingParamError } from '@/application/errors/missing-param-error'
import { Validation } from '@/application/protocols/validation'

export class RequiredFieldsValidation implements Validation {
  constructor (private readonly fieldName: string) { }

  validate (input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}
