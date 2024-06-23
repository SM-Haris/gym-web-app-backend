import Sequelize from 'sequelize'

export type DatabaseConfig = {
  client: Sequelize.Dialect
  connection: string
  host: string
  username: string
  port: number
  schema: string
  password: string
  name: string
  pool: {
    min: number
    max: number
  }
}
