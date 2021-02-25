export const loadUsersPath = {
  tags: ['Usuários'],
  summary: 'Carrega uma lista dos usuários',
  description: 'Carrega uma lista dos usuários. Aceita um parâmetro de paginação que é opcional, caso seja enviado a lista de usuários é dividida em páginas com 10 artigos por página.  Essa rota pode ser executada por qualquer **usuário**.',
  security: [{
    apiKeyAuth: []
  }],
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
              $ref: '#/schemas/user'
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
