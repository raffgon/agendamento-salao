const { DataTypes } = require("sequelize");
const { Op } = require("sequelize");
const sequelize = require("../helpers/bd");

const Funcionario = require("./Funcionario");

const HorarioModel = sequelize.define('horarios', {
    id_horario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
    dia_semana_horario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    inicio_horario: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fim_horario: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status_horario: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

HorarioModel.belongsTo(Funcionario.Model, { foreignKey: 'id_funcionario', targetKey: 'id_funcionario' });

module.exports = {
    novo: async (id_funcionario, dia_semana_horario, inicio_horario, fim_horario, status_horario) => {
        const horarioExistente = await HorarioModel.findOne({
            where: {
                id_funcionario: id_funcionario,
                dia_semana_horario: dia_semana_horario,
                [Op.or]: [
                    {
                        inicio_horario: { [Op.between]: [inicio_horario, fim_horario] }
                    },
                    {
                        fim_horario: { [Op.between]: [inicio_horario, fim_horario] }
                    }
                ]
            }
        });
        if (horarioExistente) {
            throw new Error('Horario ja cadastrado para o funcionario');
        }
        return await HorarioModel.create({
            id_funcionario: id_funcionario,
            dia_semana_horario: dia_semana_horario,
            inicio_horario: inicio_horario,
            fim_horario: fim_horario,
            status_horario: status_horario
        });
    },
    listar: async () => {
        return await HorarioModel.findAll();
    },
    mudarStatus: async (id_horario, status_horario) => {
        return await HorarioModel.update({
            status_horario: status_horario
        }, {
            where: {
                id_horario: id_horario
            }
        });
    },
    getAllbyId: async (id_funcionario) => {
        const funcionarioExistente = await Funcionario.Model.findByPk(id_funcionario);
        if(funcionarioExistente){
            return await HorarioModel.findAll({
                where: {
                    id_funcionario: id_funcionario
                }
            });
        } else{
            throw new Error('Funcionario inexistente');
        }
    },
    getDisponiveisbyId: async (id_funcionario) => {
        const funcionarioExistente = await Funcionario.Model.findByPk(id_funcionario);
        if(funcionarioExistente){
            return await HorarioModel.findAll({
                where: {
                    id_funcionario: id_funcionario,
                    status_horario: 'disponivel'
                }
            });
        } else{
            throw new Error('Funcionario inexistente');
        }
    },
    Model: HorarioModel
}