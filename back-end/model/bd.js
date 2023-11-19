const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: '0607',
    database: 'AgendamentosBD'
});


const UsuarioModel = sequelize.define('usuarios', {
    id_usuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome_usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email_usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha_usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        bcrypt: true
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});
const SalaoModel = sequelize.define('salao', {
    id_salao: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_dono: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id_usuario'
        }
    },
    nome_salao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endereco_salao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fone_salao: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'saloes'
});

SalaoModel.belongsTo(UsuarioModel, {foreignKey: 'id_dono', targetKey: 'id_usuario'});
module.exports = {
    sequelize: sequelize,
    SalaoModel: SalaoModel,
    UsuarioModel: UsuarioModel
}