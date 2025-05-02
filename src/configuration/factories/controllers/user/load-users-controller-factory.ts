import { Controller } from '@/application/protocols/controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { LoadUsersController } from '@/application/controllers/user/load-users-controller'
import { makeDbLoadUsers } from '../../usecases/user/db-load-users-factory'

export const makeLoadUsersController = (): Controller => {
  const loadUsersController = new LoadUsersController(makeDbLoadUsers())
  return makeLogControllerDecorator(loadUsersController)
}
