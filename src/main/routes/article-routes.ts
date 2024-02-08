/* eslint-disable @typescript-eslint/no-misused-promises */
import { adaptMiddleware } from '@/main/adapters/express-middleware-adapter'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeAuthMiddleware } from '@/main/factories/middlewares/auth-middleware'
import { makeAddArticleController } from '../factories/controllers/article/add-article-controller-factory'
import { makeDeleteArticleController } from '../factories/controllers/article/delete-article-controller-factory'
import { makeEditArticleController } from '../factories/controllers/article/edit-article-controller-factory'
import { makeLoadArticlesController } from '../factories/controllers/article/load-articles-controller-factory'

import { Router } from 'express'
import { upload } from '@/main/middlewares/multer'

const router = Router()

router.post('/', upload.single('imageBinary'), adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeAddArticleController()))
router.get('/', adaptRoute(makeLoadArticlesController()))
router.put('/:articleId', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeEditArticleController()))
router.delete('/:articleId', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeDeleteArticleController()))

export { router as articleRouter }
