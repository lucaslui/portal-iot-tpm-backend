/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

import { adaptRoute } from '@/configuration/adapters/express-route-adapter'
import { makeLoadPortalCoursesController } from '@/configuration/factories/controllers/portal/load-portal-courses-controller-factory'
import { makeLoadPortalArticlesController } from '@/configuration/factories/controllers/portal/load-portal-articles-controller-factory'
import { makeLoadPortalArticleByIdController } from '@/configuration/factories/controllers/portal/load-portal-article-by-id-controller-factory'

const router = Router()

router.get('/articles', adaptRoute(makeLoadPortalArticlesController()))
router.get('/articles/:articleId', adaptRoute(makeLoadPortalArticleByIdController()))
router.get('/courses', adaptRoute(makeLoadPortalCoursesController()))

export { router as portalRouter }
