export const editCategoryPath = {
  tags: ['Categorias'],
  summary: 'Edita os dados de uma categoria',
  description: 'Edita os dados de uma categoria. Todos os valores da categoria são obrigatórios. Essa rota só pode ser executada por **usuários autenticados**',
  security: [{
    apiKeyAuth: []
  }],
  requestBody: {
    required: true,
    description: 'Dados atualizados da categoria',
    content: {
      'application/json': {
        schema: {
          $ref: '#/schemas/category'
        }
      }
    }
  },
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
