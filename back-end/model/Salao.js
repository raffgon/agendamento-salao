const {DataTypes} = require("sequelize");
const sequelize = require("../helpers/bd");

const Usuario = require("./Usuario");

const SalaoModel = sequelize.define('salao', {
    id_salao: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_dono: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
            model: 'usuarios',
            key: 'id_usuario'
        }
    },
    nome_salao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endereco_salao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fone_salao: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'saloes'
});

SalaoModel.belongsTo(Usuario.Model, {foreignKey: 'id_dono', targetKey: 'id_usuario'});

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
    },

    listar: async () => {
        return await SalaoModel.findAll()   
    },

    editar: async (usuario_logado, id_salao, nome_salao, endereco_salao, fone_salao) => {
        const salaoExiste = await SalaoModel.findByPk(id_salao);
        if(!salaoExiste) {
            throw new Error('Salão inexistente');
        }

        const usuarioehDono = await Usuario.Model.findByPk(usuario_logado);
        if(usuarioehDono.id_usuario !== salaoExiste.id_dono) {
            throw new Error('Usuario não é dono');
            
        }

        const salao = await SalaoModel.update({
            nome_salao: nome_salao,
            endereco_salao: endereco_salao,
            fone_salao: fone_salao
        }, {
            where: {
                id_salao: id_salao
            }
        })
        return salao;
    },

    Model: SalaoModel
}