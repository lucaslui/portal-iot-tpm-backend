import cors from 'cors'

const corsOptions = {
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'x-access-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept']
}

export const corsMiddleware = cors(corsOptions)
