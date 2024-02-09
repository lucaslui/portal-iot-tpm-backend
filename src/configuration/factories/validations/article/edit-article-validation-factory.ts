import { Validation } from '@/application/protocols/validation'
import { ValidationComposite } from '@/application/validation/composites/validation-composite'
import { RequiredFieldsValidation } from '@/application/validation/validators/required-fields-validation'

export const makeEditArticleValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['title', 'description', 'content', 'categoryIds']) {
    validations.push(new RequiredFieldsValidation(field))
  }

  return new ValidationComposite(validations)
}
