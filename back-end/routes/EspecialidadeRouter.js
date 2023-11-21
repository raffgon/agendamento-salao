var express = require('express');
var router = express.Router();

const Especialidade = require('../model/Especialidade');
const Servico = require('../model/Servico');
const Auth = require('../helpers/Auth');

router.post('/novo', Auth.validaAcesso, Auth.verificaAdmin, async function(req, res, next) {
  try {
    let especialidade = await Especialidade.novo(req.body.nome_especialidade);
    res.json({especialidade: especialidade});
  } catch(e) {
    res.status(400).json({mensagem: "Falha ao salvar especialidade  " + e})
  }
});

router.post('/novoServico', Auth.validaAcesso, Auth.verificaAdmin, async function(req, res, next) {
  try {
    let servico = await Servico.novo(req.body.id_especialidade, req.body.nome_servico, req.body.custo_servico, req.body.duracao_servico);
    res.json({servico: servico});
  } catch(e) {
    res.status(400).json({mensagem: "Falha ao salvar servico" + e})
  }
});

module.exports = router;