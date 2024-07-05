/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

import { adaptMiddleware } from '@/configuration/adapters/express-middleware-adapter'
import { adaptRoute } from '@/configuration/adapters/express-route-adapter'
import { makeAuthMiddleware } from '@/configuration/factories/middlewares/auth-middleware'
import { makeAddCourseController } from '../factories/controllers/course/add-course-controller-factory'
import { makeDeleteCourseController } from '../factories/controllers/course/delete-course-controller-factory'
import { makeEditCourseController } from '../factories/controllers/course/edit-course-controller-factory'
import { makeLoadCoursesController } from '../factories/controllers/course/load-courses-controller-factory'
import { makeLoadCourseByIdController } from '@/configuration/factories/controllers/course/load-course-by-id-controller-factory'

import { upload } from '@/configuration/middlewares/multer'

const router = Router()

router.post('/', upload.single('imageBinary'), adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeAddCourseController()))
router.put('/:courseId', upload.single('imageBinary'), adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeEditCourseController()))
router.get('/', adaptRoute(makeLoadCoursesController()))
router.get('/:courseId', adaptRoute(makeLoadCourseByIdController()))
router.delete('/:courseId', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeDeleteCourseController()))

export { router as courseRouter }
