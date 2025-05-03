import { adaptMiddleware } from '@/configuration/adapters/express-middleware-adapter'
import { adaptRoute } from '@/configuration/adapters/express-route-adapter'
import { makeAuthMiddleware } from '@/configuration/factories/middlewares/auth-middleware'
import { makeAddCategoryController } from '../factories/controllers/category/add-category-controller-factory'
import { makeLoadCategoriesController } from '../factories/controllers/category/load-categories-controller-factory'
import { makeEditCategoryController } from '../factories/controllers/category/edit-category-controller-factory'
import { makeDeleteCategoryController } from '../factories/controllers/category/delete-category-controller-factory'
import { makeLoadCategoriesTreeController } from '../factories/controllers/category/load-categories-tree-controller-factory'

import { Router } from 'express'

const router = Router()

router.post('/', adaptMiddleware(makeAuthMiddleware('admin')), adaptRoute(makeAddCategoryController()))
router.get('/', adaptRoute(makeLoadCategoriesController()))
router.get('/tree', adaptRoute(makeLoadCategoriesTreeController()))
router.put('/:categoryId', adaptMiddleware(makeAuthMiddleware('admin')), adaptRoute(makeEditCategoryController()))
router.delete('/:categoryId', adaptMiddleware(makeAuthMiddleware('admin')), adaptRoute(makeDeleteCategoryController()))

export { router as categoryRouter }
