import mongoose from 'mongoose'
import config from './config/config'

mongoose.connect(config.MONGO_DATABASE)

const connection = mongoose.connection

connection.once('open', () => {
  console.log('mongoDB connection stablisehd')
})

connection.on('error', (err) => {
  console.log(err)
  process.exit(0)
})
