/* eslint-disable @typescript-eslint/no-misused-promises */
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeLoginController } from '../factories/controllers/auth/login-controller-factory'
// import { makeSignUpController } from '../factories/controllers/auth/signup-controller-factory'

import { Router } from 'express'

const router = Router()

router.post('/login', adaptRoute(makeLoginController()))
// router.post('/signup', adaptRoute(makeSignUpController()))

export { router as authRouter }
