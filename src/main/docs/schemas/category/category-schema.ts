export const categorySchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: 'Identificador único da categoria'
    },
    name: {
      type: 'string',
      description: 'Nome da categoria'
    },
    description: {
      type: 'string',
      description: 'Uma breve descrição da categoria'
    },
    imageUrl: {
      type: 'string',
      description: 'A URL de uma imagem utilizada como capa da categoria'
    },
    categoryParentId: {
      type: 'string',
      description: 'A indentificação única da categoria pai do artigo (se houver)'
    }
  },
  example: {
    id: '507f191e810c19729de860ea',
    name: 'Sensores e Atuadores',
    description: 'Tutoriais e notícias envolvendo sensores e atuadores',
    imageUrl: 'https://inforchannel.com.br/wp-content/uploads/2019/05/Iot.jpg',
    categoryParentId: '469f191e8155c19729de860ea'
  },
  required: ['id', 'name', 'description', 'categoryParentId']
}
