var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');


const sequelize = require('../helpers/bd');
const Usuario = require('../model/Usuario');

router.get('/install', async function(req, res, next) {
    try {
        await sequelize.sync();
        res.json({ mensagem: "Tabelas criadas com sucesso" });
    } catch (e) {
        res.status(500).json({ mensagem: "Falha ao criar tabelas" + e});
    }
});

router.post('/login', async function (req, res, next) {
    try {
        const usuario = await Usuario.Model.findOne({ where: { email_usuario: req.body.email_usuario } });
        console.log('usuario recebido: ' + JSON.stringify(usuario));
        if (!usuario) {
            return res.status(401).json({ mensagem: 'Email não cadastrado' });
        }
        if (usuario.senha_usuario !== req.body.senha_usuario) {
            return res.status(401).json({ mensagem: 'Senha inválida' + 'senha passada:' + req.body.senha_usuario + 'senha do BD:' + usuario.senha_usuario});
        }
        
        const token = jwt.sign({ usuario: usuario }, '321@!#', {expiresIn: '1000 min'});
        res.json({ mensagem: 'Usuario logado', token: token , id_usuario: usuario.id_usuario});
    } catch (error) {
        console.log('Erro de login: ' + error);
        res.status(500).json({ mensagem: 'Erro ao fazer login: ' + error.message });
    }
});

router.post('/cadastro', async function (req, res, next) {
    try {
        const existeUsuario = await Usuario.Model.findOne({ where: { email_usuario: req.body.email_usuario } });
        if (existeUsuario) {
            return res.status(400).json({ mensagem: "Já existe um usuário com o mesmo email" });
        }
        let usuario = await Usuario.novo(req.body.nome_usuario, req.body.email_usuario, req.body.senha_usuario, req.body.isAdmin || false);
        res.json({ usuario: usuario });
    } catch (e) {
        res.status(400).json({ mensagem: "Falha ao salvar usuário" + e });
    }
});

router.get('/', (req, res) => {
    res.send('Bem-vindo à página inicial');
});


module.exports = router