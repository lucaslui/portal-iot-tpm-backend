export const unauthorizedComponent = {
  description: 'Unauthorized: credenciais inválidas',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
