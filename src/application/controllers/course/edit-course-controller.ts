import { badRequest, noContent, serverError, unauthorized } from '@/application/helpers/http-helper'
import { Controller } from '@/application/protocols/controller'
import { HttpRequest, HttpResponse } from '@/application/protocols/http'
import { Validation } from '@/application/protocols/validation'
import { EditCourse } from '@/usecases/boundaries/inputs/course/edit-course'

export class EditCourseController implements Controller {
  constructor(
    private readonly editCourse: EditCourse,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { articleId } = httpRequest.params
      const imageBinary = httpRequest.file
      const categoryIds = JSON.parse(httpRequest.body.categoryIds)
      const { title, description, type, observation, landingPageUrl, registrationPeriod, classPeriod, classSchedules } = httpRequest.body
      const isSuccessful = await this.editCourse.edit(
        articleId,
        {
          title,
          description,
          type,
          observation,
          landingPageUrl,
          registrationPeriod,
          classPeriod,
          classSchedules,
          categoryIds,
          imageBinary
        },
        httpRequest.userId
      )
      if (!isSuccessful) {
        return unauthorized()
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
