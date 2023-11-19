const {AgendamentoModel} = require('./bd');

module.exports = {
    novo: async (id_usuario, id_funcionario, id_servico, data_agendamento) => {
        return await AgendamentoModel.create({
            id_usuario: id_usuario,
            id_funcionario: id_funcionario,
            id_servico: id_servico,
            data_agendamento: data_agendamento
        });
    },
    buscaPorId: async (id_agendamento) => {
        return await AgendamentoModel.findByPk(id_agendamento);
    }
}