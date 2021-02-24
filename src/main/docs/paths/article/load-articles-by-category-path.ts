export const loadArticleByCategoryPath = {
  tags: ['artigos'],
  summary: 'Carrega uma lista dos 10 artigos mais recententes por categoria (como valores de cabeçalho, i.e. sem conteúdo)',
  description: 'Carrega uma lista dos 10 artigos mais recententes por categoria (como valores de cabeçalho, i.e. sem conteúdo). O identicador único da categoria é obrigatório. Aceita um parâmetro de paginação que é opcional. Essa rota pode ser executada por qualquer **usuário**.',
  parameters: [{
    name: 'categoryId',
    in: 'path',
    description: 'O identificador único da categoria',
    required: true,
    schema: {
      type: 'string'
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
