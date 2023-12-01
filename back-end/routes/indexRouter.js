var express = require('express');
var router = express.Router();
const sequelize = require('../helpers/bd');
const AutenticaRouter = require('./AutenticaRouter');

router.get('/install', async function(req, res, next) {
    try {
        await sequelize.sync();
        res.json({ mensagem: "Tabelas criadas com sucesso" });
    } catch (e) {
        res.status(500).json({ mensagem: "Falha ao criar tabelas" + e});
    }
});

router.use('/autenticacao', AutenticaRouter);

router.get('/', (req, res) => {
    res.send('Bem-vindo à página inicial');
});


module.exports = router