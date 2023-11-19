const {SalaoModel} = require('./bd');

module.exports = {
    novo: async (id_dono, nome_salao, endereco_salao, fone_salao) => {
        return await SalaoModel.create({
            id_dono: id_dono,
            nome_salao: nome_salao,
            endereco_salao: endereco_salao,
            fone_salao: fone_salao
        })
    },
    buscaPorId: async (id_salao) => {
        return await SalaoModel.findByPk(id_salao)
    }
}