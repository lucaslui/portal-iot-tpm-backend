export const deleteArticlePath = {
  tags: ['Artigos'],
  summary: 'Deleta um artigo no portal',
  description: 'Deleta um artigo no portal. O identicador do artigo é obrigatório. Essa rota só pode ser executada por **usuários autenticados**',
  security: [
    {
      apiKeyAuth: []
    }
  ],
  parameters: [
    {
      name: 'articleId',
      in: 'path',
      description: 'O identificador único do artigo',
      required: true,
      schema: {
        type: 'string'
      }
    }
  ],
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
