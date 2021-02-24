export const loadArticleByIdPath = {
  tags: ['artigos'],
  summary: 'Carrega o conteúdo de um artigo pelo identificador',
  description: 'Carrega o conteúdo de um artigo pelo identificador. O identicador do artigo é obrigatório. Essa rota pode ser executada por qualquer **usuário**.',
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
      description: 'Ok: dados obtidos com sucesso',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/article'
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
