export const loadUserProfilePath = {
  tags: ['Usuários'],
  summary: 'Carrega o perfil de determinado usuário',
  description: 'Carrega o perfil de determinado usuário. O identificador do usuário é obrigatório. Essa rota pode ser executada por **qualquer usuário**.',
  parameters: [
    {
      name: 'userId',
      in: 'path',
      description: 'O identificador único do usuário',
      required: true,
      schema: {
        type: 'string'
      }
    }
  ],
  responses: {
    200: {
      description: 'Ok: operação realizada com sucesso',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/profile'
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
