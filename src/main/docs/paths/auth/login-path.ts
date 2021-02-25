export const loginPath = {
  post: {
    tags: ['Autenticação'],
    summary: 'Autenticar o usuário para permitir acesso a alguns recursos do blog (publicar artigos)',
    description: 'Autenticar o usuário para permitir acesso a alguns recursos do blog (publicar artigos). Essa rota pode ser executada por **qualquer usuário**',
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
        description: 'Ok: operação realizada com sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/accessToken'
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
