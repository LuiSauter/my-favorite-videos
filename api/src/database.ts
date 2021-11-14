import mongoose from 'mongoose'
import config from './config/config'

const connectionString = config.NODE_ENVS === 'test'
  ? config.MONGO_DATABASE_TEST
  : config.MONGO_DATABASE

mongoose.connect(connectionString)

const connection = mongoose.connection

connection.once('open', () => {
  console.log('mongoDB connection stablisehd')
})

connection.on('error', (err) => {
  console.log(err)
  process.exit(0)
})
