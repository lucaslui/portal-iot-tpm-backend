import { Controller } from '@/application/protocols/controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { EditUserProfileController } from '@/application/controllers/user/edit-user-profile-controller'
import { makeDbEditUserProfile } from '../../usecases/user/db-edit-user-profile-factory'
import { makeEditUserProfileValidation } from '../../validations/user/edit-user-profile-validation-factory'

export const makeEditUserProfileController = (): Controller => {
  const editUserProfileController = new EditUserProfileController(makeDbEditUserProfile(), makeEditUserProfileValidation())
  return makeLogControllerDecorator(editUserProfileController)
}
