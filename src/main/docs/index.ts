import { loginPath, signupPath } from './paths/auth'
import { editUserProfilePath, loadUserProfilePath, loadUsersPath } from './paths/user'
import { addArticlePath, deleteArticlePath, editArticlePath, loadArticlesPath } from './paths/article'
import { addCategoryPath, deleteCategoryPath, editCategoryPath, loadCategoriesPath } from './paths/category'
import { accessTokenSchema, apiKeyAuthSchema, loginParamsSchema, signupParamsSchema } from './schemas/auth'
import { addArticleSchema, articleHeaderSchema, articleSchema } from './schemas/article'
import { addCategorySchema, categorySchema, categoriesTreeSchema } from './schemas/category'
import { notFoundComponent , badRequestComponent , serverErrorComponent , unauthorizedComponent, forbiddenComponent, noContentComponent } from './components'
import { userProfileSchema, userSchema } from './schemas/user'
import { changeUserPasswordPath } from './paths/user/change-user-password-path'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Backend do Blog',
    description:
      'Documentação da API que trata de armazenar e servir as entidades de **artigos** e **categorias** do blog.' +
      'A API também permite a criação de contas de usuários autores e administradores.\n\n' +
      '<a href="https://lucaslui.github.io/blog/home"> Link para o Blog </a>',
    version: '1.0.0',
    contact: {
      name: 'Lucas Lui Motta',
      url: 'https://www.linkedin.com/in/lucas-lui-motta/'
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
    name: 'Autenticação',
    description: 'Operações relacionadas com o acesso do usuário no blog.'
  },{
    name: 'Usuários',
    description: 'Operações relacionadas com os usuários do blog.'
  },{
    name: 'Artigos',
    description: 'Operações relacionadas com os artigos do blog.'
  },{
    name: 'Categorias',
    description: 'Operações relacionadas com as categorias do blog.'
  }],
  paths: {
    '/login': loginPath,
    '/signup': signupPath,
    '/users/password': {
      put: changeUserPasswordPath
    },
    '/users/profile': {
      put: editUserProfilePath
    },
    '/users': {
      get: loadUsersPath
    },
    '/users/{userId}': {
      get: loadUserProfilePath
    },
    '/articles': {
      post: addArticlePath,
      get: loadArticlesPath
    },
    '/articles/{articleId}': {
      put: editArticlePath,
      delete: deleteArticlePath
    },
    '/categories': {
      post: addCategoryPath,
      get: loadCategoriesPath
    },
    '/categories/{categoryId}': {
      put: editCategoryPath,
      delete: deleteCategoryPath
    }
  },
  schemas: {
    accessToken: accessTokenSchema,
    loginParams: loginParamsSchema,
    signupParams: signupParamsSchema,
    user: userSchema,
    profile: userProfileSchema,
    article: articleSchema,
    articleHeader: articleHeaderSchema,
    addArticle: addArticleSchema,
    category: categorySchema,
    addCategory: addCategorySchema,
    categoriesTree: categoriesTreeSchema
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
      Usuário: userSchema,
      Artigo: articleSchema,
      Categoria: categorySchema
    }
  }
}
