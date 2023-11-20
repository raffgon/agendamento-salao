const {DataTypes} = require("sequelize");
const sequelize = require("../helpers/bd");

const Usuario = require("./Usuario");
const Funcionario = require("./Funcionario");
const Servico = require("./Servico");

const AgendamentoModel = sequelize.define('agendamentos', {
    id_agendamento: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
            model: 'usuarios',
            key: 'id_usuario'
        }
    },
    id_funcionario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
            model: 'funcionarios',
            key: 'id_funcionario'
        }
    },
    id_servico: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
            model: 'servicos',
            key: 'id_servico'
        }
    },
    data_agendamento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status_agendamento: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

AgendamentoModel.belongsTo(Usuario.Model, { foreignKey: 'id_usuario', targetKey: 'id_usuario' });
AgendamentoModel.belongsTo(Funcionario.Model, { foreignKey: 'id_funcionario', targetKey: 'id_funcionario' });
AgendamentoModel.belongsTo(Servico.Model, { foreignKey: 'id_servico', targetKey: 'id_servico' });


module.exports = {
    novo: async (id_usuario, id_funcionario, id_servico, data_agendamento, status_agendamento) => {
        return await AgendamentoModel.create({
            id_usuario: id_usuario,
            id_funcionario: id_funcionario,
            id_servico: id_servico,
            data_agendamento: data_agendamento,
            status_agendamento: status_agendamento
        });
    },
    buscaPorId: async (id_agendamento) => {
        return await AgendamentoModel.findByPk(id_agendamento);
    },
    Model: AgendamentoModel
}