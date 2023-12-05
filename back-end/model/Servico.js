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
        return await ServicoModel.findByPk(id_servico);
    },
    getAllByEspecialidade: async (id_especialidade) => {
        const especialidadeExistente = await Especialidade.Model.findByPk(id_especialidade);
        if (!especialidadeExistente) {
            throw new Error('Especialidade inexistente');
        }
        return await ServicoModel.findAll({
            where: {
                id_especialidade: id_especialidade
            }
        });
    },
    Model: ServicoModel
}