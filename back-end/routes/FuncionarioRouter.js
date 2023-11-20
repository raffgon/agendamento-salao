var express = require('express');
var router = express.Router();

const Funcionario = require('../model/Funcionario');
const FuncionarioEspecialidade = require('../model/FuncionarioEspecialidade');
const Auth = require('../helpers/Auth');

router.post('/novo', Auth.validaAcesso, async function(req, res, next) {
  try {
    let funcionario = await Funcionario.novo(req.body.id_usuario, req.body.id_salao);
    res.json({funcionario: funcionario});
  } catch(e) {
    res.status(400).json({mensagem: "Falha ao salvar funcionario" + " Erro:" + e})
  }
});

router.post('/novaEspecialidade', async function(req, res, next) {
  try {
    let novaEspecialidade = await FuncionarioEspecialidade.novo(req.body.id_funcionario, req.body.id_especialidade);
    res.json({novaEspecialidade: novaEspecialidade});
  } catch(e) {
    res.status(400).json({mensagem: "Falha ao salvar especialidade" + " Erro:" + e})
  }
});

module.exports = router;