export const loadCourseByIdPath = {
  tags: ['Cursos'],
  summary: 'Carrega um curso oferecido pelo identificador único',
  description: 'Essa rota pode ser executada por **qualquer usuário**.',
  parameters: [
    {
      name: 'courseId',
      in: 'path',
      description: 'O identificador único do curso oferecido',
      required: true,
      schema: {
        type: 'string'
      }
    }
  ],
  responses: {
    200: {
      description: 'Ok: operação realizada com sucesso',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              $ref: '#/schemas/courseLookup'
            }
          }
        }
      }
    },
    404: {
      $ref: '#/components/notFound'
    },
    500: {
      $ref: '#/components/serverError'
    }
  }
}
