export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb+srv://account:account@cluster0.vtoft.mongodb.net/blog-db?retryWrites=true&w=majority',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'chave-secreta-local'
}
