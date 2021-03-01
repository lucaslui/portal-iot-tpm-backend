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
    name: 'Internet das Coisas',
    description: 'Tutoriais e notícias envolvendo a Internet das Coisas (IoT)',
    categoryParentId: '603bb03cf134dd2ce7d4f64b'
  },
  required: ['name', 'description', 'categoryParentId']
}
