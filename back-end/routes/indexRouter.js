var express = require('express');
var router = express.Router();
const sequelize = require('../helpers/bd');
const AutenticaRouter = require('./AutenticaRouter');

const Agendamento = require('../model/Agendamento');
const Funcionario = require('../model/Funcionario');
const FuncionarioEspecialidade = require('../model/FuncionarioEspecialidade');
const Horario = require('../model/Horario');
const Servico = require('../model/Servico');
const Usuario = require('../model/Usuario');
const Salao = require('../model/Salao');

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