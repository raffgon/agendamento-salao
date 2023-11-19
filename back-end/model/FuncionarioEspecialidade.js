const {FuncionarioEspecialidadeModel} = require('./bd');

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