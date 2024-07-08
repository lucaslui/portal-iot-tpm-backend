
import { Controller } from '@/application/protocols/controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { ChangeUserPasswordController } from '@/application/controllers/user/change-user-password-controller'
import { makeDbChangeUserPassword } from '../../usecases/user/db-change-user-password-factory'
import { makeChangeUserPasswordValidation } from '../../validations/user/change-user-password-validation-factory'

export const makeChangeUserPasswordController = (): Controller => {
  const changeUserPasswordController = new ChangeUserPasswordController(makeDbChangeUserPassword(), makeChangeUserPasswordValidation())
  return makeLogControllerDecorator(changeUserPasswordController)
}
