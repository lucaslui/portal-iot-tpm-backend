export const loadUsersPath = {
  tags: ['Usuários'],
  summary: 'Carrega uma lista com todos os usuários',
  description:
    'Carrega uma lista com todos os usuários cadastrados no portal. Aceita um parâmetro de paginação que é opcional, caso seja enviado a lista de usuários é dividida em páginas com 10 usuários por página.  Essa rota só pode ser executada por um **administrador**.',
  security: [
    {
      apiKeyAuth: []
    }
  ],
  parameters: [
    {
      name: 'page',
      in: 'query',
      description: 'A página de artigos desejada',
      schema: {
        type: 'integer'
      }
    }
  ],
  responses: {
    200: {
      description: 'Ok: operação realizada com sucesso',
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
    403: {
      $ref: '#/components/forbidden'
    },
    404: {
      $ref: '#/components/notFound'
    },
    500: {
      $ref: '#/components/serverError'
    }
  }
}
