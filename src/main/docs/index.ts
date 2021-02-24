import { accessPath } from './paths/account'
import { addArticlePath, deleteArticlePath, editArticlePath, loadArticleByIdPath, loadArticleByCategoryPath, loadArticlesPath } from './paths/article'
import { accountSchema, apiKeyAuthSchema, loginParamsSchema, signupParamsSchema } from './schemas/account'
import { addArticleSchema, articleHeaderSchema, articleSchema } from './schemas/article'
import { categorySchema } from './schemas/category'
import { notFoundComponent , badRequestComponent , serverErrorComponent , unauthorizedComponent, forbiddenComponent, noContentComponent } from './components'
import { addCategoryPath } from './paths/category'
import { addCategorySchema } from './schemas/category/add-category-schema'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Backend do Blog',
    description:
      'Documentação da API que trata de armazenar e servir as entidades de **artigos** e **categorias** do blog. A API também permite o acesso restrito do autor para o gerencimentado das entidades.',
    version: '1.0.0',
    contact: {
      name: 'Lucas Lui Motta',
      url: 'https://lucaslui.github.io/blog/home'
    },
    license: {
      name: 'GPL v3.0 License',
      url: 'https://www.gnu.org/licenses/gpl-3.0.en.html'
    }
  },
  servers: [{
    url: '/api',
    description: 'servidor principal'
  }],
  tags: [{
    name: 'acesso',
    description: 'Operações relacionadas com o acesso restrito do blog.'
  },{
    name: 'artigos',
    description: 'Operações relacionadas com os artigos do blog.'
  },{
    name: 'categorias',
    description: 'Operações relacionadas com as categorias do blog.'
  }],
  paths: {
    '/acesso': accessPath,
    '/artigos': {
      post: addArticlePath,
      put: editArticlePath,
      get: loadArticlesPath
    },
    '/artigos/{categoryId}': {
      get: loadArticleByCategoryPath
    },
    '/artigos/{articleId}': {
      get: loadArticleByIdPath,
      delete: deleteArticlePath
    },
    '/categorias': {
      post: addCategoryPath
    }
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    signupParams: signupParamsSchema,
    article: articleSchema,
    articleHeader: articleHeaderSchema,
    addArticle: addArticleSchema,
    category: categorySchema,
    addCategory: addCategorySchema
  },
  components: {
    badRequest: badRequestComponent,
    unauthorized: unauthorizedComponent,
    noContent: noContentComponent,
    notFound: notFoundComponent,
    serverError: serverErrorComponent,
    forbidden: forbiddenComponent,
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    schemas: {
      Artigo: articleSchema,
      Categoria: categorySchema
    }
  }
}
