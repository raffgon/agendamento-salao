const {DataTypes} = require("sequelize");
const sequelize = require("../helpers/bd");

const UsuarioModel = sequelize.define('usuarios', {
    id_usuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome_usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email_usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha_usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        bcrypt: true
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

module.exports = {
    novo: async (nome, email, senha) => {
        return await UsuarioModel.create({
            nome_usuario: nome,
            email_usuario: email,
            senha_usuario: senha
        });
    },
    getAll: async () => {
        return await UsuarioModel.findAll();
    },
    makeAdmin: async (id_usuario) => {
        try {
            console.log('id_usuario: ' + id_usuario);
            const usuario = await UsuarioModel.findByPk(id_usuario);
            if (!usuario) {
                throw new Error('Usuário não encontrado');
            }
            usuario.is_admin = true;
            await usuario.save();
            return usuario;
        } catch (error) {
            throw new Error('Falha ao tornar o usuário admin: ' + error.message);
        } 
    },
    Model: UsuarioModel
}