const {EspecialidadeModel} = require('./bd');

module.exports = {
    novo: async (nome_especialidade) => {
        return await EspecialidadeModel.create({
            nome_especialidade: nome_especialidade
        });
    },
    buscaPorId: async (id_especialidade) => {
        return await EspecialidadeModel.findByPk(id_especialidade);
    }
}