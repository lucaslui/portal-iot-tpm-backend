export const hemsDeviceDataPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Dispositivo HEMS'],
    summary: 'API para obter dados selecionados do dispositivo HEMS',
    description: 'Essa rota só pode ser executada por **usuários autenticados** e com dispositivos HEMS **vinculados a conta**',
    parameters: [{
      name: 'deviceId',
      in: 'path',
      description: 'O identificador da tomada inteligente',
      required: true,
      schema: {
        type: 'string',
        enum: ['device_id_1', 'device_id_2']
      }
    },{
      name: 'measureId',
      in: 'query',
      description: 'O tipo de medida desejada',
      schema: {
        type: 'string',
        enum: ['measure_1', 'measure_2']
      }
    }, {
      name: 'granularity',
      in: 'query',
      description: 'O nível de granuralidade desejado (em minutos)',
      schema: {
        type: 'integer',
        enum: [15, 30, 60]
      }
    }, {
      name: 'timeStart',
      in: 'query',
      description: 'A data inicial das medições (YYYY-MM-DD)',
      schema: {
        type: 'string',
        format: 'date',
        pattern: '([0-9]{4})-(?:[0-9]{2})-([0-9]{2})'
      }
    }, {
      name: 'timeEnd',
      in: 'query',
      description: 'A data final das medições (YYYY-MM-DD)',
      schema: {
        type: 'string',
        format: 'date',
        pattern: '([0-9]{4})-(?:[0-9]{2})-([0-9]{2})'
      }
    }],
    responses: {
      200: {
        description: 'Ok: dados obtidos com sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/dataMeasures'
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
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
