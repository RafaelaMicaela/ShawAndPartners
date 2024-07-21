import { Sequelize } from 'sequelize'


const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
})

const initDb = async () => {
  await sequelize.sync({ force: false })
}

initDb()

export { sequelize }
