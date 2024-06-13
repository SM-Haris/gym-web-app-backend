import { readdirSync } from 'fs'
import { basename, dirname } from 'path'
import { Sequelize, DataTypes } from 'sequelize'
import config from 'config'
import pg from 'pg'
import Exception from '../helpers/Exception'
import ErrorMessages from '../constants/ErrorMessages'
import { DatabaseConfig } from '../interfaces/Config'

const _dirname = dirname(__filename)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db: any = {}

const dbConfig = config.get('database') as DatabaseConfig

const sequelize = new Sequelize(
  dbConfig.name,
  dbConfig.username,
  dbConfig.password,
  {
    dialectModule: pg,
    host: dbConfig.host,
    dialect: dbConfig.client,
    schema: dbConfig.schema,
    ssl: true,
    pool: dbConfig.pool,
    logging: (...msg) => {},
  }
)

const syncModels = async () => {
  try {
    const files = readdirSync(_dirname).filter(
      (file) =>
        file.indexOf('.') !== 0 &&
        file !== basename(__filename) &&
        file.slice(-3) === '.js'
    )

    for await (const file of files) {
      const model = await import(`./${file}`)
      const namedModel = new model.default(sequelize, DataTypes)
      db[namedModel.name] = namedModel
    }

    Object.keys(db).forEach((modelName) => {
      if (db[modelName].associate) {
        db[modelName].associate(db)
      }
    })
  } catch (error) {
    const customError = error as Exception

    console.log(`[ERROR] ${customError.message}`)
    throw new Exception(ErrorMessages.MESSAGES.MODELS_SYNC_FAILURE)
  }
}

const createConnection = async () => {
  try {
    await sequelize.authenticate()
    await syncModels()
    await sequelize.sync({ force: true })
  } catch (error) {
    const customError = error as Exception

    console.log(`[ERROR] ${customError.message}`)
    throw new Exception(
      `[ERROR] ${ErrorMessages.MESSAGES.DATABASE_CONNECTION_ERROR}`
    )
  }
}

export default { sequelize, createConnection, db }
