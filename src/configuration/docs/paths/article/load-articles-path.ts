export const loadArticlesPath = {
  tags: ['Artigos'],
  summary: 'Carrega uma lista de artigos (como valores de cabeçalho, ou seja, sem conteúdo)',
  description: 'Carrega uma lista de artigos (como valores de cabeçalho, ou seja, sem conteúdo). Aceita parâmetros de paginação que são opcionais. Essa rota pode ser executada por **qualquer usuário**.',
  parameters: [{
    name: 'page',
    in: 'query',
    description: 'A página de artigos desejada',
    schema: {
      type: 'integer'
    }
  },{
    name: 'limit',
    in: 'query',
    description: 'A quantidade de artigos por página',
    schema: {
      type: 'integer'
    }
  }, {
    name: 'type',
    in: 'query',
    description: 'O tipo do artigo (notícia, tutorial, etc)',
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
    name: 'categoryIds',
    in: 'query',
    description: 'Os identificadores únicos das categorias',
    schema: {
      type: 'array',
      items: {
        type: 'string'
      }
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
