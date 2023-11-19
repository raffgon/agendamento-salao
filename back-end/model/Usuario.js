const {UsuarioModel} = require('./bd');

module.exports = {
    novo: async (nome, email, senha) => {
        return await UsuarioModel.create({
            nome_usuario: nome,
            email_usuario: email,
            senha_usuario: senha
        })
    },
    getAll: async () => {
        return await UsuarioModel.findAll()
    }

}