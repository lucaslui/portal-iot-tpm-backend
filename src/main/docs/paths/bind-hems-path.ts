export const bindHemsPath = {
  put: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Dispositivo HEMS'],
    summary: 'API para vincular um identificador HEMS com uma conta de usuário',
    description: 'Essa rota só pode ser executada por **usuários autenticados**',
    requestBody: {
      required: true,
      description: 'Identificador único do dispositivo HEMS a ser vínculado a uma conta de usuário',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/bindHems'
          }
        }
      }
    },
    responses: {
      204: {
        description: 'No Content: vínculo realizado com sucesso'
      },
      400: {
        $ref: '#/components/badRequest'
      },
      403: {
        $ref: '#/components/forbidden'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
