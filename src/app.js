import db from './database/db.js'
import express from 'express'
import estoqueRoutes from './routes/estoqueRoutes.js'
import cors from 'cors'

const teste = await db.get('SELECT 1')
console.log(teste)
const app = express()
app.use(express.json())
app.use(cors())

app.use(estoqueRoutes)

export default app
