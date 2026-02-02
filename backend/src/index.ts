import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const port = process.env.PORT ? Number(process.env.PORT) : 4000

app.get('/api/hello', (_req, res) => {
  res.json({ message: process.env.MESSAGE || 'Hello from backend!' })
})

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`)
})
