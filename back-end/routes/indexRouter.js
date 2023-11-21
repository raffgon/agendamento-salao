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
        if (!usuario) {
            return res.status(401).json({ mensagem: 'Email não cadastrado' });
        }
        if (usuario.senha_usuario !== req.body.senha_usuario) {
            return res.status(401).json({ mensagem: 'Senha inválida' + 'senha passada:' + req.body.senha_usuario + 'senha do BD:' + usuario.senha_usuario});
        }
        
        const token = jwt.sign({ usuario: usuario }, '321@!#', {expiresIn: '1000 min'});
        res.cookie('token', token, {httpOnly: true, secure: true});
        res.cookie('id_usuario', usuario.id_usuario, { httpOnly: true, secure: true });
        res.json({ mensagem: 'Usuario logado', token: token });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao fazer login: ' + error.message });
    }
})

router.get('/', (req, res) => {
    res.send('Bem-vindo à página inicial');
});


module.exports = router