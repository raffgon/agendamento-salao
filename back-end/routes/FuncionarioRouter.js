var express = require('express');
var router = express.Router();

const FuncionarioModel = require('../model/Funcionario');
const FuncionarioEspecialidadeModel = require('../model/FuncionarioEspecialidade');

router.post('/novo', async function(req, res, next) {
    try {
        let funcionario = await FuncionarioModel.novo(req.body.id_usuario, req.body.id_salao);
        res.json({funcionario: funcionario});
      } catch(e) {
        res.status(400).json({mensagem: "Falha ao salvar funcionario" + " Erro:" + e})
      }
});

router.post('/novaEspecialidade', async function(req, res, next) {
    try {
        let novaEspecialidade = await FuncionarioEspecialidadeModel.novo(req.body.id_funcionario, req.body.id_especialidade);
        res.json({novaEspecialidade: novaEspecialidade});
      } catch(e) {
        res.status(400).json({mensagem: "Falha ao salvar funcionario" + " Erro:" + e})
      }
});

module.exports = router;