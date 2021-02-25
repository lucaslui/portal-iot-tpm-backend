export const loginParamsSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      description: 'E-mail de cadastro do usuário'
    },
    password: {
      type: 'string',
      description: 'Senha de cadastro do usuário'
    }
  },
  example: {
    email: 'any_email@mail.com',
    password: 'any_password'
  },
  required: ['email', 'password']
}
