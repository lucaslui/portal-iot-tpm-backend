import 'dotenv/config'

export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/blog-database?readPreference=primary&appname=MongoDB%20Compass&ssl=false',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'chave-secreta-local',
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || 'cloud-name',
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || 'api-key',
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET
}
