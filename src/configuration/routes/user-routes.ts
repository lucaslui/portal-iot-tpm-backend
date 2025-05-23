import { Router } from 'express'

import { adaptMiddleware } from '@/configuration/adapters/express-middleware-adapter'
import { adaptRoute } from '@/configuration/adapters/express-route-adapter'
import { makeChangeUserPasswordController } from '@/configuration/factories/controllers/user/change-user-password-controller-factory'
import { makeEditUserProfileController } from '@/configuration/factories/controllers/user/edit-user-profile-controller-factory'
import { makeLoadUserProfileController } from '@/configuration/factories/controllers/user/load-user-profile-controller-factory'
import { makeLoadUsersController } from '@/configuration/factories/controllers/user/load-users-controller-factory'
import { makeAuthMiddleware } from '@/configuration/factories/middlewares/auth-middleware'

import { upload } from '@/configuration/middlewares/multer'

const router = Router()

router.put('/password', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeChangeUserPasswordController()))
router.put('/profile', upload.single('imageBinary'), adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeEditUserProfileController()))
router.get('/', adaptMiddleware(makeAuthMiddleware('admin')), adaptRoute(makeLoadUsersController()))
router.get('/:userId', adaptRoute(makeLoadUserProfileController()))

export { router as userRouter }
