import { connect, connection } from 'mongoose'

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/shopapi'

connect(MONGO_URL)

const database = connection

database.on('open', () => {
  console.log('Database connection open')
})

database.on('connected', () => {
  console.log('Database connected successfully')
})

database.on('error', (e) => {
  console.error('Database connection error', e)
})

database.on('disconnected', (e) => {
  console.log('Database disconnected', e)
})

export default database
