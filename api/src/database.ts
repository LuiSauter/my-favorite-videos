import mongoose from 'mongoose'
import config from './config/config'

const connectionString = config.NODE_ENVS === 'test' ? config.MONGO_DATABASE_TEST : config.MONGO_DATABASE


// (async () => {
//   try {
//     const db = await mongoose.connect(connectionString, {useNewUrlParser: true})
//     console.log('Database is connected to:', db.connection.name)
//   } catch (error) {
//     console.log(error)
//   }
// })()

async function connect() {
  try {
    await mongoose.connect(connectionString)
    console.log('mongoDB connection stablisehd')
  } catch (err) {
    return console.error(err)
  }
}

export default connect

// const connection = mongoose.connection

// connection.once('open', () => {
//   console.log('mongoDB connection stablisehd')
// })

// connection.on('error', (err) => {
//   console.log(err)
//   process.exit(0)
// })
