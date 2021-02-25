export const addCategorySchema = {
  type: 'object',
  properties: {
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
      description: 'A indentificação única da categoria pai do artigo (obs: quando não há uma categoria pai, colocar "geral")'
    }
  },
  example: {
    name: 'Sensores e Atuadores',
    description: 'Tutoriais e notícias envolvendo sensores e atuadores',
    categoryParentId: 'Internet das Coisas'
  },
  required: ['name', 'description', 'categoryParentId']
}
