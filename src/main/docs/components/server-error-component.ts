export const serverErrorComponent = {
  description: 'Server Error: problema no servidor',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
