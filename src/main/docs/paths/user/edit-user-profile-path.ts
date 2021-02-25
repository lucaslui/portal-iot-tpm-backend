export const editUserProfilePath = {
  tags: ['Usuários'],
  summary: 'Editar o perfil do usuário',
  description: 'O usuário pode editar o próprio perfil. Todos os dados do perfil do usuário são obrigatórios. Essa rota só pode ser executada por **usuários autenticados**',
  security: [{
    apiKeyAuth: []
  }],
  requestBody: {
    required: true,
    description: 'Dados atualizados do perfil do usuário',
    content: {
      'application/json': {
        schema: {
          $ref: '#/schemas/profile'
        }
      }
    }
  },
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
