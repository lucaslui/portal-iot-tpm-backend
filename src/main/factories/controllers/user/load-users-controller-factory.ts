
import { Controller } from '@/presentation/protocols/controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { LoadUsersController } from '@/presentation/controllers/user/load-users-controller'
import { makeDbLoadUsers } from '../../services/user/db-load-users-factory'

export const makeLoadUsersController = (): Controller => {
  const loadUsersController = new LoadUsersController(makeDbLoadUsers())
  return makeLogControllerDecorator(loadUsersController)
}
