export const dataMeasuresSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      measure: {
        type: 'string'
      },
      values: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            value: { type: 'string' },
            timeStamp: { type: 'string' }
          }
        }
      }
    }
  }
}
