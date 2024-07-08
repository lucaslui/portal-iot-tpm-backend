/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

import { adaptRoute } from '@/configuration/adapters/express-route-adapter'
import { makeLoadPortalCoursesController } from '@/configuration/factories/controllers/portal/load-portal-courses-controller-factory'

const router = Router()

router.get('/courses', adaptRoute(makeLoadPortalCoursesController()))

export { router as portalRouter }
