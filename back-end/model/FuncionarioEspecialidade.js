const {DataTypes} = require("sequelize");
const sequelize = require("../helpers/bd");

const Funcionario = require("./Funcionario");
const Especialidade = require("./Especialidade");

const FuncionarioEspecialidadeModel = sequelize.define('funcionarios_especialidades', {
    id_funcionario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
            model: 'funcionarios',
            key: 'id_funcionario'
        }
    },
    id_especialidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
            model: 'especialidades',
            key: 'id_especialidade'
        }
    }
});

FuncionarioEspecialidadeModel.belongsTo(Funcionario.Model, { foreignKey: 'id_funcionario', targetKey: 'id_funcionario' });
Funcionario.Model.belongsToMany(Especialidade.Model, { through: FuncionarioEspecialidadeModel, foreignKey: 'id_funcionario' });
Especialidade.Model.belongsToMany(Funcionario.Model, { through: FuncionarioEspecialidadeModel, foreignKey: 'id_especialidade' });


module.exports = {
    novo: async (id_funcionario, id_especialidade) => { 
        const especialidadeFuncionarioExistente = await FuncionarioEspecialidadeModel.findOne({ where: { id_funcionario: id_funcionario, id_especialidade: id_especialidade } });
        if(especialidadeFuncionarioExistente){
            throw new Error('Especialidade do funcionário ja existe');
        }

        return await FuncionarioEspecialidadeModel.create({
            id_funcionario: id_funcionario,
            id_especialidade: id_especialidade
        });
    },
    buscaPorIdFuncionario: async (id_funcionario) => {
        return await FuncionarioEspecialidadeModel.findByPk(id_funcionario);
    },
    getAllByEspecialidade: async (id_especialidade) => {
        const query = `
        SELECT f.id_funcionario ,f.apelido_funcionario
        FROM Funcionarios_Especialidades fe
        JOIN Funcionarios f ON fe.id_funcionario = f.id_funcionario
        WHERE fe.id_especialidade = :id_especialidade;
    `;
    const result = await sequelize.query(query, {
        replacements: { id_especialidade },
        type: sequelize.QueryTypes.SELECT
    });
        return result;
    },
    model: FuncionarioEspecialidadeModel
}