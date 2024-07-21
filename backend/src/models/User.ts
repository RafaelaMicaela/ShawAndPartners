import { DataTypes, Model } from 'sequelize'
import { sequelize } from './index'

class User extends Model {
  public id!: number
  public name!: string
  public city!: string
  public country!: string
  public favorite_sport!: string
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  favorite_sport: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'Users',
})

export default User
