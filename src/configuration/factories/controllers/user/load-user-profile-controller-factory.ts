import { LoadUserProfileController } from '@/application/controllers/user/load-user-profile-controller'
import { Controller } from '@/application/protocols/controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbLoadUserProfile } from '../../usecases/user/db-load-user-profile-factory'

export const makeLoadUserProfileController = (): Controller => {
  const loadUserProfileController = new LoadUserProfileController(makeDbLoadUserProfile())
  return makeLogControllerDecorator(loadUserProfileController)
}
