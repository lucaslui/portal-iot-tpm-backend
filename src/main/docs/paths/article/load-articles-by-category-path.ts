export const loadArticleByCategoryPath = {
  tags: ['Artigos'],
  summary: 'Carrega uma lista de artigos por categoria (como valores de cabeçalho, i.e. sem conteúdo)',
  description: 'Carrega uma lista de artigos por categoria (como valores de cabeçalho, i.e. sem conteúdo). Aceita um parâmetro de paginação que é opcional, caso seja enviado a lista de artigos é dividida em páginas com 10 artigos por página. O identicador único da categoria é obrigatório. Aceita um parâmetro de paginação que é opcional. Essa rota pode ser executada por qualquer **usuário**.',
  parameters: [{
    name: 'categoryId',
    in: 'path',
    description: 'O identificador único da categoria',
    required: true,
    schema: {
      type: 'string'
    }
  }, {
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
