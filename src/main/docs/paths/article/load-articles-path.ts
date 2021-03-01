export const loadArticlesPath = {
  tags: ['Artigos'],
  summary: 'Carrega uma lista de artigos (como valores de cabeçalho, i.e. sem conteúdo)',
  description: 'Carrega uma lista de artigos (como valores de cabeçalho, i.e. sem conteúdo). Aceita um parâmetro de paginação que é opcional, caso seja enviado a lista de artigos é dividida em páginas com 10 artigos por página.  Essa rota pode ser executada por **qualquer usuário**.',
  parameters: [{
    name: 'page',
    in: 'query',
    description: 'A página de artigos desejada',
    schema: {
      type: 'integer'
    }
  },{
    name: 'articleId',
    in: 'query',
    description: 'O identificador único do artigo',
    schema: {
      type: 'string'
    }
  }, {
    name: 'userId',
    in: 'query',
    description: 'O identificador único do usuário',
    schema: {
      type: 'string'
    }
  }, {
    name: 'categoryId',
    in: 'query',
    description: 'O identificador único da categoria',
    schema: {
      type: 'string'
    }
  }, {
    name: 'month',
    in: 'query',
    description: 'O mês que deseja selecionar os artigos (formato: MM)',
    schema: {
      type: 'integer'
    }
  }, {
    name: 'year',
    in: 'query',
    description: 'O ano que deseja selecionar os artigos (formato: YYYY)',
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
