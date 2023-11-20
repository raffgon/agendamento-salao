const {DataTypes} = require("sequelize");
const sequelize = require("../helpers/bd");

const Especialidade = require("./Especialidade");

const ServicoModel = sequelize.define('servicos', {
    id_servico: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_especialidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
            model: 'especialidades',
            key: 'id_especialidade'
        }
    },
    nome_servico: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    custo_servico: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    duracao_servico: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

ServicoModel.belongsTo(Especialidade.Model, { foreignKey: 'id_especialidade', targetKey: 'id_especialidade' });

module.exports = {
    novo: async (id_especialidade, nome_servico, custo_servico, duracao_servico) => {
        return await ServicoModel.create({
            id_especialidade: id_especialidade,
            nome_servico: nome_servico,
            custo_servico: custo_servico,
            duracao_servico: duracao_servico
        });
    },
    buscaPorId: async (id_servico) => {
        return await ServicoModelModel.findByPk(id_servico);
    },
    Model: ServicoModel
}