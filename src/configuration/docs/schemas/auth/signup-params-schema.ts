export const signupParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      description: 'Nome do usuário'
    },
    email: {
      type: 'string',
      description: 'E-mail do usuário'
    },
    password: {
      type: 'string',
      description: 'Senha do usuário'
    },
    passwordConfirmation: {
      type: 'string',
      description: 'Confirmação de senha do usuário'
    }
  },
  example: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  },
  required: ['name', 'email', 'password', 'passwordConfirmation']
}
