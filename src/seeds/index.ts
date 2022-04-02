import { connect, connection } from 'mongoose'
import seed from './seed'

const MONGO_URI = process.env.MONGO_URL || 'mongodb://localhost:27017/storeapi'

connect(MONGO_URI)

const database = connection

database.on('connected', async () => {
  console.log('***** DB connected sucessfully *****\n')
  await seed(database)
})

database.on('error', (error) => {
  console.log('***** An error ocurred when trying to connect to DB *****\n')
  console.error(error)
})

database.on('disconnected', () => {
  console.log('***** DB was disconnected *****\n')
})

export default database
