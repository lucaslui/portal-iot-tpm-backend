export const deleteCategoryPath = {
  tags: ['Categorias'],
  summary: 'Deleta uma categoria no blog',
  description: 'Deleta uma categoria no blog. O identicador da categoria é obrigatório. Essa rota só pode ser executada por **administradores**',
  security: [{
    apiKeyAuth: []
  }],
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
