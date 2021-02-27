
import { Controller } from '@/presentation/protocols/controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { EditUserProfileController } from '@/presentation/controllers/user/edit-user-profile-controller'
import { makeDbEditUserProfile } from '../../services/user/db-edit-user-profile-factory'
import { makeEditUserProfileValidation } from '../../validations/user/edit-user-profile-validation-factory'

export const makeEditUserProfileController = (): Controller => {
  const editUserProfileController = new EditUserProfileController(makeDbEditUserProfile(), makeEditUserProfileValidation())
  return makeLogControllerDecorator(editUserProfileController)
}
