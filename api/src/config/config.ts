import dotenv from 'dotenv'
dotenv.config()

export default {
  MONGO_DATABASE: process.env.MONGO_DB_URL || '',
  MONGO_DATABASE_TEST: process.env.MONGO_DB_URL_TEST || '',
  NODE_ENVS: process.env.NODE_ENV || '',
  PORT: process.env.PORT || 4000,
  jwtSecret: process.env.JWT_SECRET || 'tokentest'
}