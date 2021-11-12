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

// (async () => {
//   try {
//     await connect(config.MONGO_DATABASE)
//     console.log('data base is connected')
//   } catch (error) {
//     console.log(error)
//   }
// })()

// process.on('error', (err) => {
//   console.log(err)
//   disconnect()
// })