var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const Usuario = require('../model/Usuario');
const UsuarioLoginSchema = require('../validators/AutenticaValidators/LoginValidator');
const UsuarioCadastroSchema = require('../validators/AutenticaValidators/CadastroValidator');

require ('dotenv').config();

router.post('/cadastro', async function (req, res) {
    const {error} = UsuarioCadastroSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({ mensagem: errorMessages });
    }
    try {
        const existeUsuario = await Usuario.Model.findOne({ where: { email_usuario: req.body.email_usuario } });
        if (existeUsuario) {
            return res.status(400).json({ mensagem: "Já existe um usuário com o mesmo email" });
        }
        let usuario = await Usuario.novo(req.body.nome_usuario, req.body.email_usuario, req.body.senha_usuario, req.body.isAdmin || false);
        res.json({mensagem: "Usuario cadastrado com sucesso", usuario: usuario});
    } catch (e) {
        res.status(400).json({ mensagem: "Falha ao salvar usuário" + e });
    }
});

router.post('/login', async function (req, res) {
    const { error } = UsuarioLoginSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({ mensagem: errorMessages });
    }
    try {
        const usuario = await Usuario.Model.findOne({ where: { email_usuario: req.body.email_usuario } });
        console.log('usuario recebido: ' + JSON.stringify(usuario));
        if (!usuario) {
            return res.status(401).json({ mensagem: 'Email não cadastrado' });
        }
        if (usuario.senha_usuario !== req.body.senha_usuario) {
            return res.status(401).json({ mensagem: 'Senha inválida' + 'senha passada:' + req.body.senha_usuario + 'senha do BD:' + usuario.senha_usuario});
        }
        
        const token = jwt.sign({ usuario: usuario }, process.env.JWT_KEY, {expiresIn: '1000 min'});
        res.json({ mensagem: 'Usuario logado com sucesso', token: token , usuario_logado: usuario.id_usuario, usuario: usuario });
        
    } catch (error) {
        console.log('Erro de login: ' + error);
        res.status(500).json({ mensagem: 'Erro ao fazer login: ' + error.message });
    }
});
module.exports = router;
