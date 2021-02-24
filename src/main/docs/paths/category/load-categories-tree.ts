export const loadArticleByCategoryPath = {
  tags: ['artigos'],
  summary: 'Carrega um objeto JSON que representa a árvore de categorias',
  description: 'Carrega um objeto JSON que representa a árvore de categorias. Essa rota pode ser executada por qualquer **usuário**.',
  responses: {
    200: {
      description: 'Ok: dados obtidos com sucesso',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              $ref: '#/schemas/categoriesTree'
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
