export const loadCategoriesByParentPath = {
  tags: ['Categorias'],
  summary: 'Carrega uma lista de categorias filhas da categoria pai enviada',
  description: 'Carrega uma lista de categorias filhas da categoria pai enviada. Aceita um parâmetro de paginação que é opcional, caso seja enviado a lista de categorias é dividida em páginas com 10 categorias por página. Essa rota pode ser executada por qualquer **usuário**.',
  parameters: [{
    name: 'categoryParentId',
    in: 'path',
    description: 'A identificação da categoria pai',
    required: true,
    schema: {
      type: 'string'
    }
  }, {
    name: 'page',
    in: 'query',
    description: 'A página de categoria desejada',
    schema: {
      type: 'integer'
    }
  }],
  responses: {
    200: {
      description: 'Ok: operação realizada com sucesso',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              $ref: '#/schemas/category'
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
