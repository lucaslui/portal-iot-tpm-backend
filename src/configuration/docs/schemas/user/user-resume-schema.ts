export const userResumeSchema = {
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
    nickname: {
      type: 'string',
      description: 'Um nome/apelido que deseja ser chamado'
    },
    createdAt: {
      type: 'date',
      description: 'Data de criação do usuário'
    }
  },
  example: {
    id: '507f191e810c19729de860ea',
    name: 'Lucas Lui Motta',
    email: 'lucasluimotta@gmail.com',
    nickname: '# Lucas Lui #'
  },
  required: ['id', 'name', 'email', 'nickname']
}
