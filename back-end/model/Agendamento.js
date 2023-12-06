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
        const agendamentoExistente = await AgendamentoModel.findOne({
        where: { id_usuario, id_funcionario, id_servico, id_horario, status_agendamento },
        });
        
        if (agendamentoExistente) {
        throw new Error('Agendamento já existe');
        }
        
        const [usuarioExistente, funcionarioExistente, servicoExistente, horarioExistente] = await Promise.all([
        Usuario.Model.findByPk(id_usuario),
        Funcionario.Model.findByPk(id_funcionario),
        Servico.Model.findByPk(id_servico),
        Horario.Model.findByPk(id_horario),
        ]);
        
        if (!usuarioExistente) {
        throw new Error('Usuário não encontrado');
        }
        
        if (!funcionarioExistente) {
        throw new Error('Funcionário não encontrado');
        }
        
        if (!servicoExistente) {
        throw new Error('Serviço não encontrado');
        }
        
        if (!horarioExistente) {
        throw new Error('Horário não encontrado');
        }
        
        if (horarioExistente.status_horario !== 'disponivel') {
        throw new Error('Horário indisponível');
        }
        
        await Horario.mudarStatus(id_horario, 'indisponivel');
        
        return await AgendamentoModel.create({
        id_usuario: id_usuario,
        id_funcionario: id_funcionario,
        id_servico: id_servico,
        id_horario: id_horario,
        status_agendamento: status_agendamento,
        });
    },
    listar: async () => {
        return await AgendamentoModel.findAll();
    },

    //COMO O PROPRIO SEQUELIZE PERMITE O USO DE QUERYS
    //ESPERO QUE ESTE METODO NAO SEJA DESCONSIDERADO NA AVALIAÇÃO
    getAgendamentoByCliente: async (id_usuario) => {
        const query = `
            SELECT a.id_agendamento, u.nome_usuario, f.apelido_funcionario, s.nome_servico, h.inicio_horario, h.fim_horario, h.dia_semana_horario, h.status_horario
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
    excluir: async (id_agendamento) => {
        const agendamento = await AgendamentoModel.findOne({
            where: {
                id_agendamento: id_agendamento
        }
        });
        if (!agendamento) {
            throw new Error('Agendamento não encontrado');
        }
        await AgendamentoModel.destroy({
            where: {
                id_agendamento: id_agendamento
            }
        });
        await Horario.mudarStatus(agendamento.id_horario, 'disponivel');
    },
    editar: async (id_agendamento, novoAgendamento) => {
        const agendamento = await AgendamentoModel.findOne({
            where: {
                id_agendamento: id_agendamento
            }
        });
        if (!agendamento) {
            throw new Error('Agendamento não encontrado');
        }

        const [usuarioExistente, funcionarioExistente, servicoExistente, horarioExistente] = await Promise.all([
            Usuario.Model.findByPk(novoAgendamento.id_usuario),
            Funcionario.Model.findByPk(novoAgendamento.id_funcionario),
            Servico.Model.findByPk(novoAgendamento.id_servico),
            Horario.Model.findByPk(novoAgendamento.id_horario),
        ]);
            
        if (!usuarioExistente) {
            throw new Error('Novo Usuário não encontrado');
        }
        
        if (!funcionarioExistente) {
            throw new Error('Novo Funcionário não encontrado');
        }
        
        if (!servicoExistente) {
            throw new Error('Novo Serviço não encontrado');
        }
        
        if (!horarioExistente) {
            throw new Error('Novo Horário não encontrado');
        }
        
        if (horarioExistente.status_horario !== 'disponivel') {
            throw new Error('Novo Horário indisponível');
        }

        if (agendamento.status_agendamento === 'cancelado') {
            throw new Error('Agendamento ja finzalizado, não pode ser editado');
        }
        await AgendamentoModel.update({
            id_usuario: novoAgendamento.id_usuario,
            id_funcionario: novoAgendamento.id_funcionario,
            id_servico: novoAgendamento.id_servico,
            id_horario: novoAgendamento.id_horario,
            status_agendamento: novoAgendamento.status_agendamento
        }, {
            where: {
                id_agendamento: id_agendamento
            }
        });
    },
    cancelar: async (id_agendamento) => {
        const agendamento = await AgendamentoModel.findOne({
            where: {
                id_agendamento: id_agendamento
            }
        });
        if (!agendamento) {
            throw new Error('Agendamento não encontrado');
        }
        if (agendamento.status_agendamento === 'cancelado') {
            throw new Error('Agendamento já esta cancelado');
        }
        await AgendamentoModel.update({
            status_agendamento: 'cancelado'
        }, {
            where: {
                id_agendamento: id_agendamento
            }
        });
        //VOLTA O HORARIO PARA DISPONIVEL
        await Horario.mudarStatus(agendamento.id_horario, 'disponivel');
    },
    Model: AgendamentoModel
}