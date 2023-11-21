const {DataTypes} = require("sequelize");
const sequelize = require("../helpers/bd");

const EspecialidadeModel = sequelize.define('especialidades', {
    id_especialidade: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome_especialidade: {
        type: DataTypes.STRING(45),
        allowNull: false
    }
});

module.exports = {
    novo: async (nome_especialidade) => {
        const especialidadeExistente = await EspecialidadeModel.findOne({ where: { nome_especialidade: nome_especialidade } });
        if(especialidadeExistente){
            throw new Error('Especialidade ja existe');
        }
        return await EspecialidadeModel.create({
            nome_especialidade: nome_especialidade
        });
    },
    buscaPorId: async (id_especialidade) => {
        return await EspecialidadeModel.findByPk(id_especialidade);
    },
    Model: EspecialidadeModel
}