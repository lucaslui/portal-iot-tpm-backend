export const forbiddenComponent = {
  description: 'Forbidden: acesso negado',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
