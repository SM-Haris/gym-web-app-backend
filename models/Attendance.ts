import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'
import { v4 } from 'uuid'
import Database from './index'

class Attendance extends Model<
  InferAttributes<Attendance>,
  InferCreationAttributes<Attendance>
> {
  declare id: CreationOptional<string>
  declare date: CreationOptional<string>
  declare member_id: CreationOptional<string>
  declare created_at: CreationOptional<Date>
  declare updated_at: CreationOptional<Date>
}

Attendance.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => v4(),
    },
    date: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    member_id: {
      type: DataTypes.TEXT,
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
  { timestamps: false, sequelize: Database.sequelize, tableName: 'attendance' }
)

export default Attendance