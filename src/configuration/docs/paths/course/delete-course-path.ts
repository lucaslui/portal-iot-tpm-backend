export const deleteCoursePath = {
  tags: ['Cursos'],
  summary: 'Deleta um oferencimento de curso no portal',
  description: 'Deleta um oferencimento de curso do portal. O identicador do artigo é obrigatório. Essa rota só pode ser executada por **usuários autenticados**',
  security: [{
    apiKeyAuth: []
  }],
  parameters: [{
    name: 'courseId',
    in: 'path',
    description: 'O identificador único do curso',
    required: true,
    schema: {
      type: 'string'
    }
  }],
  responses: {
    204: {
      $ref: '#/components/noContent'
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
