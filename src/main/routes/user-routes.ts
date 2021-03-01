/* eslint-disable @typescript-eslint/no-misused-promises */
import { adaptMiddleware } from '@/main/adapters/express-middleware-adapter'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeChangeUserPasswordController } from '@/main/factories/controllers/user/change-user-password-controller-factory'
import { makeEditUserProfileController } from '@/main/factories/controllers/user/edit-user-profile-controller-factory'
import { makeLoadUserProfileController } from '@/main/factories/controllers/user/load-user-profile-controller-factory'
import { makeLoadUsersController } from '@/main/factories/controllers/user/load-users-controller-factory'
import { makeAuthMiddleware } from '@/main/factories/middlewares/auth-middleware'

import { Router } from 'express'

const router = Router()

router.put('/password', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeChangeUserPasswordController()))
router.put('/profile', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeEditUserProfileController()))
router.get('/', adaptMiddleware(makeAuthMiddleware('admin')), adaptRoute(makeLoadUsersController()))
router.get('/:userId', adaptRoute(makeLoadUserProfileController()))

export { router as userRouter }
