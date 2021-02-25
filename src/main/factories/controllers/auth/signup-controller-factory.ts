
import { SignUpController } from '@/presentation/controllers/auth/signup-controller'
import { Controller } from '@/presentation/protocols/controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbCreateUser } from '../../usecases/auth/db-create-user-factory'
import { makeDbAuthentication } from '../../usecases/auth/db-authentication-factory'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const signUpController = new SignUpController(makeDbCreateUser(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(signUpController)
}
