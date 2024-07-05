import { badRequest, ok, serverError } from '@/application/helpers/http-helper'
import { Controller } from '@/application/protocols/controller'
import { HttpRequest, HttpResponse } from '@/application/protocols/http'
import { Validation } from '@/application/protocols/validation'
import { AddCourse } from '@/usecases/boundaries/inputs/course/add-course'

export class AddCourseController implements Controller {
  constructor (
    private readonly addCourse: AddCourse,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const imageBinary = httpRequest.file
      const userId = httpRequest.userId
      const { title, description, type, observation, landingPageUrl, registrationPeriod, classPeriod, classSchedules, categoryIds } = httpRequest.body
      const article = await this.addCourse.add({
        title,
        description,
        type,
        observation,
        landingPageUrl,
        registrationPeriod,
        classPeriod,
        classSchedules,
        imageBinary,
        userId,
        categoryIds
      })
      return ok(article)
    } catch (error) {
      return serverError(error)
    }
  }
}
