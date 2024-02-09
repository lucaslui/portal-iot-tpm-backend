import { EmailValidatorAdapter } from '@/infrastructure/validators/email-validator-adapter'
import { Validation } from '@/application/protocols/validation'
import { ValidationComposite } from '@/application/validation/composites/validation-composite'
import { EmailValidation } from '@/application/validation/validators/email-validation'
import { RequiredFieldsValidation } from '@/application/validation/validators/required-fields-validation'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldsValidation(field))
  }

  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
