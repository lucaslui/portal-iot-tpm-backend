import { EmailValidatorAdapter } from '@/infrastructure/validators/email-validator-adapter'
import { Validation } from '@/presentation/protocols/validation'
import { ValidationComposite } from '@/validation/composites/validation-composite'
import { EmailValidation } from '@/validation/validators/email-validation'
import { RequiredFieldsValidation } from '@/validation/validators/required-fields-validation'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldsValidation(field))
  }

  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
