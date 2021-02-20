/* eslint-disable @typescript-eslint/no-misused-promises */
import { adaptRoute } from '../../adapters/express-route-adapter'
import { makeLoginController } from '../../factories/controllers/login/login-controller-factory'

import { Router } from 'express'

const router = Router()

router.post('/login', adaptRoute(makeLoginController()))

export { router as loginRouter }
