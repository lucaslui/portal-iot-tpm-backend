export const addCategoryPath = {
  tags: ['Categorias'],
  summary: 'Adicionar uma nova categoria ao blog',
  description: 'Adicionar uma nova categoria ao blog. Nome, descrição e identificador da categoria pai são obrigatórios. Essa rota só pode ser executada por **administradores**',
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
      description: 'Ok: operação realizada com sucesso',
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
