const { Sequelize, Model, DataTypes } = require('sequelize')

const CONFIGURATION = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mariadb',
    logging: false
}

const sequelize = new Sequelize( process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, CONFIGURATION)

const Task = sequelize.define('Task', {
    id : {
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    username : DataTypes.STRING,
    task_value : DataTypes.STRING
})

const getTasks = async () => {
    return await Task.findAll()
}


module.exports = {
    Task,
    sequelize,
    getTasks
}