import dotenv from 'dotenv'
dotenv.config()

import express, { Request, Response } from 'express'
import cors from 'cors'

const port = process.env.PORT || '3000'
const version = process.env.VERSION || '1'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(port, () => {
    console.log(`Api version ${version}, running on port ${port}`)
})

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ version: process.env.npm_package_version })
})

const modules: string[] = []

modules.forEach((moduleName) => {
    app.use(`/api/v${version}/${moduleName}`, require(`modules/v${version}/${moduleName}/routes`))
})