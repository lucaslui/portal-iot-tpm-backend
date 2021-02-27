import { LoadUserProfileController } from '@/presentation/controllers/user/load-user-profile-controller'
import { Controller } from '@/presentation/protocols/controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbLoadUserProfile } from '../../services/user/db-load-user-profile-factory'

export const makeLoadUserProfileController = (): Controller => {
  const loadUserProfileController = new LoadUserProfileController(makeDbLoadUserProfile())
  return makeLogControllerDecorator(loadUserProfileController)
}
