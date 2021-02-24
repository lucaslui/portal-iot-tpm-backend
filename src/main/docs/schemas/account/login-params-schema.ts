export const loginParamsSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },
  example: {
    username: 'any_username',
    password: 'any_password'
  },
  required: ['username', 'password']
}
