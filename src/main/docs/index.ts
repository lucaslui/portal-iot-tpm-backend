import { bindHemsPath, loginPath, signupPath } from './paths'
import { accountSchema , bindHemsSchema, errorSchema , loginParamsSchema, signupParamsSchema, dataMeasuresSchema } from './schemas'
import { notFoundComponent , badRequestComponent , serverErrorComponent , unauthorizedComponent, forbiddenComponent } from './components'
import { apiKeyAuthSchema } from './schemas/api-key-auth-schema'
import { hemsDeviceDataPath } from './paths/load-device-data-path'

export default {
  openapi: '3.0.0',
  info: {
    title: 'API Software em Nuvem',
    description:
      'Essa API trata de servir **dados de medições** que foram enviados e armazenados na nuvem. ' +
      'Os dados são originários dos **dispositivos HEMS** instalados nas casas. ' +
      'Além disso, a API conta com um serviço de **acesso e registro de usuários** visto que grande parte dos dados são de cunho pessoal ou privado.',
    version: '1.0.0',
    license: {
      name: `© ${new Date().getFullYear()} Copel. Todos os direitos reservados.`,
      url: 'https://www.copel.com/'
    }
  },
  servers: [{
    url: '/api',
    description: 'servidor principal'
  }],
  tags: [{
    name: 'Acesso e Registro de Usuários',
    description: 'APIs relacionadas ao acesso e registro dos usuários do sistema'
  },{
    name: 'Dispositivo HEMS',
    description: 'APIs relacionadas ao vínculo e obtenção de dados do dispositivos HEMS'
  }],
  paths: {
    '/login': loginPath,
    '/signup': signupPath,
    '/hems/bind': bindHemsPath,
    '/hems/{deviceId}/data': hemsDeviceDataPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    signupParams: signupParamsSchema,
    bindHems: bindHemsSchema,
    error: errorSchema,
    dataMeasures: dataMeasuresSchema
  },
  components: {
    badRequest: badRequestComponent,
    unauthorized: unauthorizedComponent,
    notFound: notFoundComponent,
    serverError: serverErrorComponent,
    forbidden: forbiddenComponent,
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    }
  }
}
