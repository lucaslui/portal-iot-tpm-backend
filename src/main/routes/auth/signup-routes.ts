/* eslint-disable @typescript-eslint/no-misused-promises */
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeSignUpController } from '@/main/factories/controllers/auth/signup-controller-factory'

import { Router } from 'express'

const router = Router()

router.post('/signup', adaptRoute(makeSignUpController()))

export { router as signupRouter }
