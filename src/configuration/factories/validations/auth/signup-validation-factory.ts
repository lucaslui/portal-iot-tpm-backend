import { EmailValidatorAdapter } from '@/infrastructure/validators/email-validator-adapter'
import { Validation } from '@/application/protocols/validation'
import { ValidationComposite } from '@/application/validation/composites/validation-composite'
import { CompareFieldsValidation } from '@/application/validation/validators/compare-fields-validation'
import { EmailValidation } from '@/application/validation/validators/email-validation'
import { RequiredFieldsValidation } from '@/application/validation/validators/required-fields-validation'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldsValidation(field))
  }

  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
