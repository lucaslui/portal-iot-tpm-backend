export const loadCategoryByIdPath = {
  tags: ['Categorias'],
  summary: 'Carrega os dados de um artigo pelo identificador',
  description: 'Carrega os dados de um artigo pelo identificador. O identicador da categoria é obrigatório. Essa rota pode ser executada por qualquer **usuário**.',
  parameters: [{
    name: 'categoryId',
    in: 'path',
    description: 'O identificador único da categoria',
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
            $ref: '#/schemas/category'
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
