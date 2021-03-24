export const loadCategoriesTreePath = {
  tags: ['Categorias'],
  summary: 'Carrega todas as categorias em uma estrutura de árvore',
  description: 'Carrega todas as categorias em uma estrutura de árvore. Essa rota pode ser executada por **qualquer usuário**.',
  parameters: [{
    name: 'categoryId',
    in: 'query',
    description: 'A identificação da categoria',
    schema: {
      type: 'string'
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
