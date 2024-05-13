import express, { Express, NextFunction, Response, Request } from 'express'
import createError from 'http-errors'
import cors from 'cors'
import logger from 'morgan'
import config from 'config'
import routes from './routes'
import Exception from './helpers/Exception'

const port = config.get('port') || 3000
const app: Express = express()

const corsOptions = {
  origin: config.get('corsUrl') as string,
}
const environments = config.get('environments') as string[]

app.use(cors(corsOptions))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(routes)

app.use(function (req, res, next) {
  next(createError(404))
})

// eslint-disable-next-line
app.use(function (err: any, req: Request, res: Response, _next: NextFunction) {
  res.status(err.status || 500)
  res.send({
    status: err.status,
    message: err.message,
  })
})

app.listen(port, () => {
  console.log(`[INFO] Server is listening at http://localhost:${port}`)
})
