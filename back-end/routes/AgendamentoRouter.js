var express = require('express');
var router = express.Router();

const Agendamento = require('../model/Agendamento');
const Auth = require('../helpers/Auth');

router.post('/novo', Auth.validaAcesso, async function(req, res, next) {
  try {
    let agendamento = await Agendamento.novo(req.body.id_usuario, req.body.id_funcionario, req.body.id_servico, req.body.id_horario, req.body.status_agendamento);
    res.json({agendamento: agendamento});
  } catch(e) {
    res.status(400).json({mensagem: "Falha ao salvar agendamento " + e})
  }
});

module.exports = router;