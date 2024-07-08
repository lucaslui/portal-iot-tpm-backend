export const loadPortalArticleByIdPath = {
  tags: ['Portal'],
  summary: 'Carrega um artigo pelo identificador único',
  description: 'Essa rota pode ser executada por **qualquer usuário**.',
  parameters: [{
    name: 'articleId',
    in: 'path',
    description: 'O identificador único do artigo',
    required: true,
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
              $ref: '#/schemas/articleLookup'
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
