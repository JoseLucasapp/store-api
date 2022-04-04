import dotenv from 'dotenv'
dotenv.config()

import './config/database'
import express, { Request, Response } from 'express'
import cors from 'cors'
import swaggerUI from 'swagger-ui-express'
import swaggerDocs from './config/swagger'

const port = process.env.PORT || '3000'
const version = process.env.VERSION || '1'
const modules: string[] = ['admins', 'managers']
const app = express()

app.use(express.json())
app.use(cors())

const options = {
  swaggerOptions: {
    authAction: {
      JWT: {
        name: 'JWT',
        schema: { type: 'apiKey', in: 'header', name: 'Authorization', description: '' },
        value:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDg3MjczMWMxY2FkY2VkZmFhNWVhYyIsImVtYWlsIjoiam9zbHVjMjAxNkBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2NDkwNDQ3NDMsImV4cCI6MTY1MTYzNjc0M30.voIPKbbFhtJjZW-SLuvoV3XBoJDjqSoFJorg5aNSCbA',
      },
    },
  },
}

app.use('/api/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs, options))

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ version: process.env.npm_package_version })
})
app.get('/terms', (req: Request, res: Response) => {
  res.status(200).json({ terms: 'Terms of service' })
})

app.listen(port, () => {
  console.log(`Api version ${version}, running on port ${port}`)
})

modules.forEach((moduleName) => {
  app.use(`/api/v${version}/${moduleName}`, require(`./modules/v${version}/${moduleName}/routes`))
})
