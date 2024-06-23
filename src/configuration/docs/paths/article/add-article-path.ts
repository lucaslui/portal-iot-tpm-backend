export const addArticlePath = {
  tags: ['Artigos'],
  summary: 'Adiciona um novo artigo ao portal',
  description: 'Adiciona um novo artigo ao portal. Título, descrição, conteúdo e categoria são campos obrigatórios. Essa rota só pode ser executada por **usuários autenticados**',
  security: [{
    apiKeyAuth: []
  }],
  requestBody: {
    required: true,
    description: 'Dados do artigo',
    content: {
      'application/json': {
        schema: {
          $ref: '#/schemas/addArticle'
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Ok: operação realizada com sucesso',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/article'
          }
        }
      }
    },
    400: {
      $ref: '#/components/badRequest'
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
