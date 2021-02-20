export const badRequestComponent = {
  description: 'Bad Request: requisição inválida',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
