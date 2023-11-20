const {DataTypes} = require("sequelize");
const sequelize = require("../helpers/bd");

const Funcionario = require("./Funcionario");
const Especialidade = require("./Especialidade");

const FuncionarioEspecialidadeModel = sequelize.define('funcionarios_especialidades', {
    id_funcionario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
            model: 'funcionarios',
            key: 'id_funcionario'
        }
    },
    id_especialidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
            model: 'especialidades',
            key: 'id_especialidade'
        }
    }
});

FuncionarioEspecialidadeModel.belongsTo(Funcionario.Model, { foreignKey: 'id_funcionario', targetKey: 'id_funcionario' });
FuncionarioEspecialidadeModel.belongsTo(Especialidade.Model, { foreignKey: 'id_especialidade', targetKey: 'id_especialidade' });



module.exports = {
    novo: async (id_funcionario, id_especialidade) => {
        return await FuncionarioEspecialidadeModel.create({
            id_funcionario: id_funcionario,
            id_especialidade: id_especialidade
        });
    },
    buscaPorIdFuncionario: async (id_funcionario) => {
        return await FuncionarioEspecialidadeModel.findByPk(id_funcionario);
    }
}