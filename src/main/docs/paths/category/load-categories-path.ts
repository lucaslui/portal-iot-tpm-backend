export const loadCategoriesPath = {
  tags: ['categorias'],
  summary: 'Carrega uma lista com as categorias ',
  description: 'Carrega uma lista dos 10 artigos mais recententes. Aceita um parâmetro de paginação que é opcional. Essa rota pode ser executada por qualquer **usuário**.',
  parameters: [{
    name: 'page',
    in: 'query',
    description: 'A página de artigos desejada',
    schema: {
      type: 'integer'
    }
  }],
  responses: {
    200: {
      description: 'Ok: dados obtidos com sucesso',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              $ref: '#/schemas/articleHeader'
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
