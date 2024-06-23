import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'
import { v4 } from 'uuid'
import Database from './index'
import User from './User'
import Member from './Member'

class Gym extends Model<InferAttributes<Gym>, InferCreationAttributes<Gym>> {
  declare id: CreationOptional<string>
  declare name: CreationOptional<string>
  declare location: CreationOptional<string>
  declare owner_id: CreationOptional<string>
  declare created_at: CreationOptional<Date>
  declare updated_at: CreationOptional<Date>
}

Gym.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => v4(),
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    owner_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE(3),
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE(3),
      defaultValue: DataTypes.NOW,
    },
  },
  { timestamps: false, sequelize: Database.sequelize, tableName: 'gym' }
)

Gym.belongsTo(User, {
  foreignKey: 'owner_id',
  onDelete: 'cascade',
  onUpdate: 'cascade',
})

export default Gym
