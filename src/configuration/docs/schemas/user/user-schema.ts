import { userProfileSchema } from './user-profile-schema'

export const userSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: 'Identificador único do usuário'
    },
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
    profile: userProfileSchema,
    createdAt: {
      type: 'date',
      description: 'Data de criação do usuário'
    }
  },
  example: {
    id: '507f191e810c19729de860ea',
    name: 'Lucas Lui Motta',
    email: 'lucasluimotta@gmail.com',
    password: 'abc78591e810c18749de860ea507f1301e810c19729de860ea',
    createdAt: '2021-01-27T13:23:15.450Z'
  },
  required: ['id', 'name', 'email']
}
