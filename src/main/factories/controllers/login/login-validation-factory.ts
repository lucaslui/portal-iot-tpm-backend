import { Validation } from '@/presentation/protocols/validation'
import { ValidationComposite } from '@/validation/composites/validation-composite'
import { RequiredFieldsValidation } from '@/validation/validators/required-fields-validation'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['username', 'password']) {
    validations.push(new RequiredFieldsValidation(field))
  }

  return new ValidationComposite(validations)
}
