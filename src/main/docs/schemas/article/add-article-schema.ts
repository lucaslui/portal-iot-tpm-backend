export const addArticleSchema = {
  type: 'object',
  properties: {
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
    categoryId: {
      type: 'string',
      description: 'A indentificação única da categoria onde o artigo será adicionado'
    }
  },
  example: {
    title: 'O que significa IoT?',
    description: 'Uma breve introdução sobre o significado de internet das coisas',
    content: 'O contéudo do arquivo gerado por um editor WYSIWYG HTML',
    imageUrl: 'https://inforchannel.com.br/wp-content/uploads/2019/05/Iot.jpg',
    categoryId: '899f191e356c20729de564ea'
  },
  required: ['title', 'description', 'content', 'categoryId']
}
