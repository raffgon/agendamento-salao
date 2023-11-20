var express = require('express');
var router = express.Router();

const Especialidade = require('../model/Especialidade');
const Servico = require('../model/Servico');

router.post('/novo', async function(req, res, next) {
  try {
    let especialidade = await Especialidade.Model.novo(req.body.nome_especialidade);
    res.json({especialidade: especialidade});
  } catch(e) {
    res.status(400).json({mensagem: "Falha ao salvar funcionario" + " Erro:" + e})
  }
});

router.post('/novoServico', async function(req, res, next) {
  try {
    let servico = await Servico.Model.novo(req.body.id_especialidade, req.body.nome_servico, req.body.custo_servico, req.body.duracao_servico);
    res.json({servico: servico});
  } catch(e) {
    res.status(400).json({mensagem: "Falha ao salvar funcionario" + " Erro:" + e})
  }
});

module.exports = router;