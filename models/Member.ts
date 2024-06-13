import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'
import { v4 } from 'uuid'
import Database from './index'
import Gym from './Gym'

class Member extends Model<
  InferAttributes<Member>,
  InferCreationAttributes<Member>
> {
  declare id: CreationOptional<string>
  declare name: CreationOptional<string>
  declare email: CreationOptional<string>
  declare gym_id: CreationOptional<string>
  declare phone_number: CreationOptional<string>
  declare fee: CreationOptional<number>
  declare created_at: CreationOptional<Date>
  declare updated_at: CreationOptional<Date>
}

Member.init(
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
    email: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    gym_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fee: {
      type: DataTypes.DECIMAL,
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
  { timestamps: false, sequelize: Database.sequelize, tableName: 'member' }
)

Member.belongsTo(Gym, {
  foreignKey: 'gym_id',
  onDelete: 'cascade',
  onUpdate: 'cascade',
})

export default Member
