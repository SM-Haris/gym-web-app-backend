import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'
import { v4 } from 'uuid'
import Database from './index'
import Member from './Member'

class Attendance extends Model<
  InferAttributes<Attendance>,
  InferCreationAttributes<Attendance>
> {
  declare id: CreationOptional<string>
  declare date: CreationOptional<string>
  declare workout_hours: CreationOptional<number>
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
    workout_hours: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    member_id: {
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
  { timestamps: false, sequelize: Database.sequelize, tableName: 'attendance' }
)

Attendance.belongsTo(Member, {
  foreignKey: 'member_id',
  onDelete: 'cascade',
  onUpdate: 'cascade',
})

export default Attendance
