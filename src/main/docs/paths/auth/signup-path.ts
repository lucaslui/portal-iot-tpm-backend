export const signupPath = {
  post: {
    tags: ['Autenticação'],
    summary: 'Criar conta de usuário',
    description: 'Criar conta de usuário para permitir acesso a alguns recursos do blog (como publicar artigos). Essa rota pode ser executada por **qualquer usuário**',
    requestBody: {
      required: true,
      description: 'Parâmetro de cadastro do usuário',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/signupParams'
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
      403: {
        $ref: '#/components/forbidden'
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
