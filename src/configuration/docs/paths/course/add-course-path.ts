export const addCoursePath = {
  tags: ['Cursos'],
  summary: 'Adiciona um novo oferencimento de curso no portal',
  description: 'Adiciona um novo oferencimento de curso ao portal. Essa rota só pode ser executada por **usuários autenticados**',
  security: [
    {
      apiKeyAuth: []
    }
  ],
  requestBody: {
    required: true,
    description: 'Dados do curso oferecido',
    content: {
      'application/json': {
        schema: {
          $ref: '#/schemas/addCourse'
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Ok: operação realizada com sucesso',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/course'
          }
        }
      }
    },
    400: {
      $ref: '#/components/badRequest'
    },
    403: {
      $ref: '#/components/forbidden'
    },
    404: {
      $ref: '#/components/notFound'
    },
    500: {
      $ref: '#/components/serverError'
    }
  }
}
