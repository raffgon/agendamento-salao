const {DataTypes} = require("sequelize");
const sequelize = require("../helpers/bd");

const Salao = require("./Salao");
const Usuario = require("./Usuario");

const FuncionarioModel = sequelize.define('funcionarios', {
    id_funcionario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id_usuario'
        }
    },
    id_salao: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
            model: 'saloes',
            key: 'id_salao'
        }
    },
    apelido_funcionario: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
FuncionarioModel.belongsTo(Usuario.Model, { foreignKey: 'id_usuario', targetKey: 'id_usuario' });
FuncionarioModel.belongsTo(Salao.Model, { foreignKey: 'id_salao', targetKey: 'id_salao' });
Salao.Model.hasMany(FuncionarioModel, { foreignKey: 'id_salao', sourceKey: 'id_salao' });

module.exports = {
    novo: async (id_usuario, id_salao, apelido_funcionario) => {
        const funcionarioExistente = await FuncionarioModel.findOne({ where: { id_usuario: id_usuario } });
        if(funcionarioExistente){
            throw new Error('Funcionário ja existe');
        }
        return await FuncionarioModel.create({
            id_usuario: id_usuario,
            id_salao: id_salao,
            apelido_funcionario: apelido_funcionario
        });
    },
    buscaPorId: async (id_funcionario) => {
        return await FuncionarioModel.findByPk(id_funcionario);
    },
    Model: FuncionarioModel
}