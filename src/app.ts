import dotenv from 'dotenv'
dotenv.config()

import './config/database'
import express, { Request, Response } from 'express'
import cors from 'cors'
import swaggerUI from 'swagger-ui-express'
import swaggerDocs from './config/swagger'

const port = process.env.PORT || '3000'
const version = process.env.VERSION || '1'
const modules: string[] = ['auth', 'managers', 'workers', 'products', 'categories']
const app = express()

app.use(express.json())
app.use(cors())

app.use(`/api/v${version}/api-docs`, swaggerUI.serve, swaggerUI.setup(swaggerDocs))

app.get(`/`, (req: Request, res: Response) => {
  res.status(200).json({ version: process.env.npm_package_version })
})
app.get(`/api/${version}/terms`, (req: Request, res: Response) => {
  res.status(200).json({ terms: 'Terms of service' })
})

app.listen(port, () => {
  console.log(`Api version ${version}, running on port ${port}`)
})

modules.forEach((moduleName) => {
  app.use(`/api/v${version}/${moduleName}`, require(`./modules/v${version}/${moduleName}/routes`))
})
