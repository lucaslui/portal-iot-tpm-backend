export const addCategoryPath = {
  tags: ['Categorias'],
  summary: 'Adiciona uma nova categoria ao blog',
  description: 'Adiciona uma nova categoria ao blog. Nome, descrição e identificador da categoria pai são obrigatórios. Essa rota só pode ser executada por **usuários autenticados**',
  security: [{
    apiKeyAuth: []
  }],
  requestBody: {
    required: true,
    description: 'Dados da categoria',
    content: {
      'application/json': {
        schema: {
          $ref: '#/schemas/addCategory'
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Ok: categoria criada com sucesso',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/category'
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
