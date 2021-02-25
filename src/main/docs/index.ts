import { loginPath, signupPath } from './paths/auth'
import { editUserProfilePath, loadUsersPath } from './paths/user'
import { addArticlePath, deleteArticlePath, editArticlePath, loadArticleByIdPath, loadArticleByCategoryPath, loadArticlesPath } from './paths/article'
import { addCategoryPath, deleteCategoryPath, editCategoryPath, loadCategoriesByParentPath, loadCategoriesPath, loadCategoryByIdPath } from './paths/category'
import { accountSchema, apiKeyAuthSchema, loginParamsSchema, signupParamsSchema } from './schemas/auth'
import { addArticleSchema, articleHeaderSchema, articleSchema } from './schemas/article'
import { addCategorySchema, categorySchema, categoriesTreeSchema } from './schemas/category'
import { notFoundComponent , badRequestComponent , serverErrorComponent , unauthorizedComponent, forbiddenComponent, noContentComponent } from './components'
import { userSchema } from './schemas/user'


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
    name: 'Autenticação',
    description: 'Operações relacionadas com o acesso e cadastro do usuário.'
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
    '/users': {
      put: editUserProfilePath,
      get: loadUsersPath
    },
    '/articles': {
      post: addArticlePath,
      put: editArticlePath,
      get: loadArticlesPath
    },
    '/articles/{categoryId}': {
      get: loadArticleByCategoryPath
    },
    '/articles/{articleId}': {
      get: loadArticleByIdPath,
      delete: deleteArticlePath
    },
    '/categories': {
      post: addCategoryPath,
      put: editCategoryPath,
      get: loadCategoriesPath
    },
    '/categories/{categoryParentId}': {
      get: loadCategoriesByParentPath
    },
    '/categories/{categoryId}': {
      get: loadCategoryByIdPath,
      delete: deleteCategoryPath
    }
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    signupParams: signupParamsSchema,
    user: userSchema,
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
