export const changeUserPasswordPath = {
  tags: ['Usuários'],
  summary: 'Trocar a senha da conta do usuário',
  description: 'O usuário pode trocar a senha da sua conta. Todos os campos são obrigatórios. Essa rota só pode ser executada por **usuários autenticados**',
  security: [{
    apiKeyAuth: []
  }],
  requestBody: {
    required: true,
    description: 'Campos de senha antiga, senha nova e confirmação de senha',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            oldPassword: {
              type: 'string',
              description: 'Campo onde deve ser inserido a senha antiga do usuário'
            },
            newPassword: {
              type: 'string',
              description: 'Campo onde deve ser inserido a senha nova do usuário'
            },
            newPasswordConfirmation: {
              type: 'string',
              description: 'Campo onde deve repetido o valor da senha nova do usuário'
            }
          }
        },
        example: {
          oldPassword: 'antiga-senha',
          newPassword: 'nova-senha',
          newPasswordConfirmation: 'nova-senha'
        },
        required: ['oldPassword', 'newPassword', 'newPasswordConfirmation']
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
