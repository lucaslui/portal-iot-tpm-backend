export const unauthorizedComponent = {
  description: 'Unauthorized: credenciais inválidas',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            example: 'Unauthorized Error'
          }
        }
      }
    }
  }
}
