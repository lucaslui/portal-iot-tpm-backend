import { Validation } from '@/presentation/protocols/validation'
import { ValidationComposite } from '@/validation/composites/validation-composite'
import { RequiredFieldsValidation } from '@/validation/validators/required-fields-validation'

export const makeAddArticleValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['title', 'description', 'content', 'categoryId']) {
    validations.push(new RequiredFieldsValidation(field))
  }

  return new ValidationComposite(validations)
}
