const {DataTypes} = require("sequelize");
const sequelize = require("../helpers/bd");

const Servico = require("./Servico");
const Agendamento = require("./Agendamento");

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
    editar: async (id_especialidade, nome_especialidade) => {
        const especialidade = await EspecialidadeModel.findByPk(id_especialidade);
        if (!especialidade) {
            throw new Error('Especialidade não encontrada.');
        }
        return await especialidade.update({
            nome_especialidade: nome_especialidade
        })
    },
    /*
        DIFICULDADE NA IMPLEMENTAÇÃO DO METODO DEVIDO A GRANDE QUANTIDADE DE RELACIONAMENTOS ENTRE TABELAS
    excluir: async (id_especialidade) => {
        try {
            const especialidade = await EspecialidadeModel.findByPk(id_especialidade);
            if (!especialidade) {
                throw new Error('Especialidade não encontrada.');
            }
            await Agendamento.Model.destroy({
                where: {
                    
                }
            })
            await Servico.Model.destroy({
                where: {
                    id_especialidade: id_especialidade
                }
            });
            await especialidade.destroy();
        } catch (error) {
            throw new Error(error.message);
        }
    },*/
    
    Model: EspecialidadeModel
}