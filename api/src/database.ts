import mongoose from 'mongoose'
import config from './config/config'

const connectionString = config.NODE_ENVS === 'test' ? config.MONGO_DATABASE_TEST : config.MONGO_DATABASE

export default async function connect() {
  const db = connectionString
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions
  await mongoose.connect(db, options)

  const connection = mongoose.connection

  connection.once('open', () => {
    console.log('mongoDB connection stablisehd')
  })
  connection.on('error', (err) => {
    console.log(err)
    process.exit(0)

  })
}
connect()
