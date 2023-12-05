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
    listar: async () => {
        return await UsuarioModel.findAll();
    },
    makeAdmin: async (id_usuario) => {
        try {
            const usuario = await UsuarioModel.findByPk(id_usuario);
            if (!usuario || usuario.is_admin == true) {
                throw new Error('Usuário não encontrado ou ja é admnistrador');
            }
            usuario.is_admin = true;
            await usuario.save();
            return usuario;
        } catch (error) {
            throw new Error(error.message);
        } 
    },
    removeAdmin: async (id_usuario) => {
        try {
            const usuario = await UsuarioModel.findByPk(id_usuario);
            if (!usuario || usuario.is_admin == false) {
                throw new Error('Usuário não encontrado ou já não é admnistrador');
            }
            usuario.is_admin = false;
            await usuario.save();
            return usuario;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    editar: async (id_usuario, novoUsuario, usuario_logado) => {
        if(usuario_logado == null){
            throw new Error('Nenhum usuário logado');

        }
        try {
            const usuario = await UsuarioModel.findByPk(id_usuario);
            const usuarioLogado = await UsuarioModel.findByPk(usuario_logado);
            if (!usuario) {
                throw new Error('Usuário não encontrado');
            }
            if ((id_usuario !== usuario_logado) && (usuarioLogado.is_admin === false) ) {
                throw new Error('Usuário não autorizado. O registro não pertence ao usuário logado ou você não é um administrador');
            }
            await usuario.update({
                nome_usuario: novoUsuario.nome_usuario,
                email_usuario: novoUsuario.email_usuario,
                senha_usuario: novoUsuario.senha_usuario
            }, {
                where: {
                    id_usuario: id_usuario
                }
            }); 
            return usuario;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    excluir: async (id_usuario) => {
        try {
            const usuario = await UsuarioModel.findByPk(id_usuario);
            if (!usuario) {
                throw new Error('Usuário não encontrado');
            }
            await usuario.destroy();
        } catch (error) {
            throw new Error(error.message);
        }
    },

    Model: UsuarioModel
}