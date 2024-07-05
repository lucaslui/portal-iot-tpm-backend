export const courseLookupSchema = {
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
    type: {
      type: 'string',
      description: 'O tipo do artigo'
    },
    content: {
      type: 'binary',
      description: 'O contéudo do arquivo gerado por um editor WYSIWYG HTML'
    },
    imageUrl: {
      type: 'string',
      description: 'A URL de uma imagem utilizada como capa do artigo'
    },
    updatedAt: {
      type: 'date',
      description: 'A data de atualização do artigo no formato ISO 8601 (e.g. 2020-01-01T18:03:23Z)'
    },
    createdAt: {
      type: 'date',
      description: 'A data de criação do artigo no formato ISO 8601 (e.g. 2020-01-01T18:03:23Z)'
    },
    user: {
      type: 'object',
      description: 'Dados do usuário autor do artigo'
    },
    categories: {
      type: 'array',
      description: 'Lista de categorias onde o artigo foi adicionado',
      items: {
        type: 'obejct',
        properties: {
          id: {
            type: 'string'
          },
          name: {
            type: 'string'
          },
          description: {
            type: 'string'
          }
        }
      }
    }
  },
  example: {
    id: '507f191e810c19729de860ea',
    title: 'O que significa IoT?',
    description: 'Uma breve introdução sobre o significado de internet das coisas',
    type: 'course',
    content: 'O contéudo do arquivo gerado por um editor WYSIWYG HTML',
    imageUrl: 'https://inforchannel.com.br/wp-content/uploads/2019/05/Iot.jpg',
    updatedAt: '2020-01-01T18:03:23Z',
    createdAt: '2020-01-01T18:03:23Z',
    user: {
      id: '284f191e356c20729de860ea',
      name: 'Lucas Lui',
      email: 'lucaslui@mail.com'
    },
    categories: [
      {
        id: '899f191e356c20729de564ea',
        name: 'IoT',
        description: 'Internet das coisas'
      }
    ]
  }
}
