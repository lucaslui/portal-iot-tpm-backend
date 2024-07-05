export const courseSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: 'Identificador único da categoria'
    },
    title: {
      type: 'string',
      description: 'Título do artigo'
    },
    description: {
      type: 'string',
      description: 'Uma breve descrição do artigo'
    },
    content: {
      type: 'binary',
      description: 'O contéudo do arquivo gerado por um editor WYSIWYG HTML'
    },
    imageUrl: {
      type: 'string',
      description: 'A URL de uma imagem utilizada como capa do artigo'
    },
    createdAt: {
      type: 'date',
      description: 'A data de criação do artigo no formato ISO 8601 (e.g. 2020-01-01T18:03:23Z)'
    },
    userId: {
      type: 'string',
      description: 'A indentificação única do usuário autor do artigo'
    },
    categoryIds: {
      type: 'array',
      description: 'A indentificação única da categoria onde o artigo será adicionado',
      items: {
        type: 'string'
      }
    }
  },
  example: {
    id: '507f191e810c19729de860ea',
    title: 'O que significa IoT?',
    description: 'Uma breve introdução sobre o significado de internet das coisas',
    content: 'O contéudo do arquivo gerado por um editor WYSIWYG HTML',
    imageUrl: 'https://inforchannel.com.br/wp-content/uploads/2019/05/Iot.jpg',
    createdAt: '2020-01-01T18:03:23Z',
    userId: '284f191e356c20729de860ea',
    categoryIds: ['899f191e356c20729de564ea']
  }
}
