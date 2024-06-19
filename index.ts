import express, { Express, NextFunction, Response, Request } from 'express'
import createError from 'http-errors'
import cors from 'cors'
import logger from 'morgan'
import routes from './routes'
import Exception from './helpers/Exception'
import Database from './models/index'

const app: Express = express()

const corsOptions = {
  origin: '*',
}

app.use(cors(corsOptions))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(routes)

app.use(function (req, res, next) {
  next(createError(404))
})

app.use(function (err: any, req: Request, res: Response, _next: NextFunction) {
  res.status(err.status || 500)
  res.send({
    status: err.status,
    message: err.message,
  })
})

app.listen(process.env.PORT || 5000, () => {
  console.log(`[INFO] Server is listening at http://localhost:${process.env.PORT}`)
})

const startServer = async () => {
  try {
    console.log('[INFO] Connecting to Database...')
    await Database.createConnection()
    console.log('[INFO] Database connected')
  } catch (error) {
    const customError = error as Exception
    console.log(`[ERROR] ${customError.message}`)
  }
}

startServer()
