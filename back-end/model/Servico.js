const {ServicoModel} = require('./bd');

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
    }
}