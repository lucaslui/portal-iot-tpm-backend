
import { SignUpController } from '@/application/controllers/auth/signup-controller'
import { Controller } from '@/application/protocols/controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbCreateUser } from '../../services/auth/db-create-user-factory'
import { makeDbAuthentication } from '../../services/auth/db-authentication-factory'
import { makeSignUpValidation } from '../../validations/auth/signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const signUpController = new SignUpController(makeDbCreateUser(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(signUpController)
}
