export const categoriesTreeSchema = {
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
    categoryParentId: {
      type: 'string',
      description: 'A indentificação única da categoria pai do artigo (se houver)'
    }
  },
  example: {
    id: '507f191e810c19729de860ea',
    name: 'Sensores e Atuadores',
    description: 'Tutoriais e notícias envolvendo sensores e atuadores',
    categoryId: 'Internet das Coisas'
  }
}
