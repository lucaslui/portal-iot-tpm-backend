import { Validation } from '@/presentation/protocols/validation'
import { ValidationComposite } from '@/validation/composites/validation-composite'
import { CompareFieldsValidation } from '@/validation/validators/compare-fields-validation'
import { RequiredFieldsValidation } from '@/validation/validators/required-fields-validation'

export const makeChangeUserPasswordValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['oldPassword', 'newPassword', 'newPasswordConfirmation']) {
    validations.push(new RequiredFieldsValidation(field))
  }

  validations.push(new CompareFieldsValidation('newPassword','newPasswordConfirmation'))

  return new ValidationComposite(validations)
}
