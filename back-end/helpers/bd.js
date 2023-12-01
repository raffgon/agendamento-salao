const Sequelize = require("sequelize")

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: '0607',
    database: 'AgendamentosBD'
});

sequelize.authenticate()
    .then(() => console.log("Conectado no PostgreSQL!"))
    .catch(error => console.log(error))

module.exports = sequelize