import { loginPath, signupPath } from './paths/auth'
import { editUserProfilePath, loadUserProfilePath, loadUsersPath } from './paths/user'
import { addArticlePath, deleteArticlePath, editArticlePath, loadArticleByIdPath, loadArticlesPath } from './paths/article'
import { addCategoryPath, deleteCategoryPath, editCategoryPath, loadCategoriesPath } from './paths/category'
import { accessTokenSchema, apiKeyAuthSchema, loginParamsSchema, signupParamsSchema } from './schemas/auth'
import { addArticleSchema, articleHeaderSchema, articleLookupSchema, articleSchema } from './schemas/article'
import { addCategorySchema, categorySchema, categoriesTreeSchema } from './schemas/category'
import { notFoundComponent , badRequestComponent , serverErrorComponent , unauthorizedComponent, forbiddenComponent, noContentComponent } from './components'
import { userProfileSchema, userSchema } from './schemas/user'
import { changeUserPasswordPath } from './paths/user/change-user-password-path'
import { loadCategoriesTreePath } from './paths/category/load-categories-tree-path'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Backend do Portal IoT-TPM',
    description:
      'Documentação da API que trata de armazenar e servir o Portal IoT-TPM.',
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
    description: 'Operações relacionadas com o acesso do usuário no portal.'
  },{
    name: 'Usuários',
    description: 'Operações relacionadas com os usuários do portal.'
  },{
    name: 'Artigos',
    description: 'Operações relacionadas com os artigos do portal.'
  },{
    name: 'Categorias',
    description: 'Operações relacionadas com as categorias do portal.'
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
      get: loadArticleByIdPath,
      put: editArticlePath,
      delete: deleteArticlePath
    },
    '/categories': {
      post: addCategoryPath,
      get: loadCategoriesPath
    },
    '/categories/tree': {
      get: loadCategoriesTreePath
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
    articleLookup: articleLookupSchema,
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
