const {DataTypes} = require("sequelize");
const sequelize = require("../helpers/bd");

const Usuario = require("./Usuario");
const Funcionario = require("./Funcionario");
const Servico = require("./Servico");
const Horario = require("./Horario");

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
    id_horario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
            model: 'horarios',
            key: 'id_horario'
        }
    },
    status_agendamento: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


AgendamentoModel.belongsTo(Usuario.Model, { foreignKey: 'id_usuario', targetKey: 'id_usuario' });
AgendamentoModel.belongsTo(Funcionario.Model, { foreignKey: 'id_funcionario', targetKey: 'id_funcionario' });
AgendamentoModel.belongsTo(Servico.Model, { foreignKey: 'id_servico', targetKey: 'id_servico' });
AgendamentoModel.belongsTo(Horario.Model, { foreignKey: 'id_horario', targetKey: 'id_horario' });


module.exports = {
    buscaPorId: async (id_agendamento) => {
        return await AgendamentoModel.findByPk(id_agendamento);
    },
    novo: async (id_usuario, id_funcionario, id_servico, id_horario, status_agendamento) => {   
        const agendamentoExistente = await AgendamentoModel.findOne({ where: { id_usuario, id_funcionario, id_horario}});
        if(agendamentoExistente){
            throw new Error('Conflito de horário');
        }
        Horario.mudarStatus(id_horario, 'indisponivel');
        return await AgendamentoModel.create({
            id_usuario: id_usuario,
            id_funcionario: id_funcionario,
            id_servico: id_servico,
            id_horario: id_horario,
            status_agendamento: status_agendamento
        });
    },

    //PERGUNTAR SE PODE USAR QUERYS DIRETAMENTE NO BD
    getAgendamentoByCliente: async (id_usuario) => {
        const query = `
            SELECT u.nome_usuario, f.apelido_funcionario, s.nome_servico, h.inicio_horario, h.fim_horario, h.dia_semana_horario, h.status_horario
            FROM Agendamentos a
            JOIN Usuarios u ON a.id_usuario = u.id_usuario
            JOIN Funcionarios f ON a.id_funcionario = f.id_funcionario
            JOIN Servicos s ON a.id_servico = s.id_servico
            JOIN Horarios h ON a.id_horario = h.id_horario
            WHERE u.id_usuario = :id_usuario;
        `;
        const result = await sequelize.query(query, {
            replacements: { id_usuario },
            type: sequelize.QueryTypes.SELECT
        });
        return result;
    },
    deleteByAgendamentoCliente: async (id_agendamento, id_usuario, id_usuario_cookie) => {
        if (id_usuario !== id_usuario_cookie) {
            throw new Error('Este agendamento nao pertence a este usuario');
        }
        const agendamento = await AgendamentoModel.findOne({
            where: {
                id_agendamento: id_agendamento,
                id_usuario: id_usuario
        }
        });
        if (!agendamento) {
            throw new Error('Agendamento não encontrado');
        }
        await AgendamentoModel.destroy({
        where: {
            id_agendamento: id_agendamento,
            id_usuario: id_usuario
        }
        });
    },
    Model: AgendamentoModel
}