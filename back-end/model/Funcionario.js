const {FuncionarioModel} = require('./bd');

module.exports = {
    novo: async (id_usuario, id_salao) => {
        return await FuncionarioModel.create({
            id_usuario: id_usuario,
            id_salao: id_salao
        });
    },
    buscaPorId: async (id_funcionario) => {
        return await FuncionarioModel.findByPk(id_funcionario);
    }
}