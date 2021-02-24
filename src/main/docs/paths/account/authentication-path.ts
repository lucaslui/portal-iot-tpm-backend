export const accessPath = {
  post: {
    tags: ['acesso'],
    summary: 'API para permitir o acesso do autor para alguns recursos do autor',
    description: 'Essa rota pode ser executada por **qualquer pesssoa**',
    requestBody: {
      required: true,
      description: 'Informações necessárias para efetuar a autenticação',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/loginParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Ok: acesso efetuado com sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/account'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      401: {
        $ref: '#/components/unauthorized'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
