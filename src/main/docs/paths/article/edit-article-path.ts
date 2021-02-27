export const editArticlePath = {
  tags: ['Artigos'],
  summary: 'Edita os dados e conteúdos de um artigo',
  description: 'Edita os dados e conteúdos de um artigo. Todos os valores do artigo são obrigatórios. Essa rota só pode ser executada por **usuários autenticados**',
  security: [{
    apiKeyAuth: []
  }],
  parameters: [{
    name: 'articleId',
    in: 'path',
    description: 'O identificador único do artigo',
    required: true,
    schema: {
      type: 'string'
    }
  }],
  requestBody: {
    required: true,
    description: 'Dados atualizados do artigo',
    content: {
      'application/json': {
        schema: {
          $ref: '#/schemas/addArticle'
        }
      }
    }
  },
  responses: {
    204: {
      $ref: '#/components/noContent'
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
