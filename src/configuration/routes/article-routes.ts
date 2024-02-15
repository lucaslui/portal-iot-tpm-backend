/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

import { adaptMiddleware } from '@/configuration/adapters/express-middleware-adapter'
import { adaptRoute } from '@/configuration/adapters/express-route-adapter'
import { makeAuthMiddleware } from '@/configuration/factories/middlewares/auth-middleware'
import { makeAddArticleController } from '../factories/controllers/article/add-article-controller-factory'
import { makeDeleteArticleController } from '../factories/controllers/article/delete-article-controller-factory'
import { makeEditArticleController } from '../factories/controllers/article/edit-article-controller-factory'
import { makeLoadArticlesController } from '../factories/controllers/article/load-articles-controller-factory'
import { makeLoadArticleByIdController } from '@/configuration/factories/controllers/article/load-article-by-id-controller-factory'

import { upload } from '@/configuration/middlewares/multer'

const router = Router()

router.post('/', upload.single('imageBinary'), adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeAddArticleController()))
router.put('/:articleId', upload.single('imageBinary'), adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeEditArticleController()))
router.get('/', adaptRoute(makeLoadArticlesController()))
router.get('/:articleId', adaptRoute(makeLoadArticleByIdController()))
router.delete('/:articleId', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeDeleteArticleController()))

export { router as articleRouter }
