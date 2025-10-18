const {Sequelize} = require('sequelize');

const sequelize = new Sequelize("postgres://test_user:66666666@localhost:5432/test_db")

const testConnection = async() => {
  try {
    await sequelize.authenticate();
    console.log('DB Connected');
    await sequelize.sync()
  } catch (error) {
    console.error('Unable to connect', error)
  }
}

testConnection()

module.exports = sequelize;