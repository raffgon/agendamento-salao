const jwt = require('jsonwebtoken');
const Usuario = require('../model/Usuario');

require ('dotenv').config();

module.exports = {
    verificaAdmin: async (req, res, next) => {
        if(req.headers.usuario_logado == undefined){
            return res.status(401).json({ mensagem: 'Nenhum usuário logado. Acesso negado' });
        }
        const usuarioLogado = await Usuario.Model.findOne({ where: { id_usuario: req.headers.usuario_logado } });
        if (usuarioLogado && usuarioLogado.is_admin) {
            next();
        } else {
            res.status(403).json({ mensagem: 'Você não é um admnistrador para fazer isso. Acesso negado' });
        }
    },
    validaAcesso: (req, res, next) => {
        try{
            let bearerToken = req.headers.authorization || '';
            let token = bearerToken.split(' ');
            if(token[0] == 'Bearer'){
                token = token[1];
            }
            jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
                if(err){
                    return res.status(401).json({ mensagem: 'Token inválido ou expirado, acesso negado' });
                }else{
                    req.usuario = decoded;
                    next();
                }
            })
        } catch(e){
            return res.status(401).json({ mensagem: 'Ocorreu algum erro com a autenticação. ' + e });
        }
    }
}