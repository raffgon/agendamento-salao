var express = require('express');
var router = express.Router();

const Agendamento = require('../model/Agendamento');
const Auth = require('../helpers/Auth');
const cookieParser = require('cookie-parser');

router.use(cookieParser());

router.post('/novo', Auth.validaAcesso, async function(req, res, next) {
  try {
    let agendamento = await Agendamento.novo(req.body.id_usuario, req.body.id_funcionario, req.body.id_servico, req.body.id_horario, req.body.status_agendamento);
    res.json({agendamento: agendamento});
  } catch(e) {
    res.status(400).json({mensagem: "Falha ao salvar agendamento " + e})
  }
});

router.get('/getAgendamentoPorCliente', Auth.validaAcesso, async function(req, res, next) {
  try {
    let agendamento = await Agendamento.getAgendamentoByCliente(req.body.id_usuario);
    res.json({agendamento: agendamento});
  } catch(e) {
    res.status(400).json({mensagem: "Falha ao buscar agendamento " + e})
  }
});

router.delete('/excluir', Auth.validaAcesso, Auth.verificaAdmin, async function(req, res, next) {
  try {
    let id_usuario_cookie = +req.cookies.id_usuario;
    console.log('cookie logado: ' + id_usuario_cookie);
    console.log('usuario logado: ' + req.body.id_usuario);
    await Agendamento.deleteByAgendamentoCliente(req.body.id_agendamento, req.body.id_usuario, id_usuario_cookie);
    res.json('Agendamento excluido com sucesso');
  } catch(e) {
    res.status(400).json({mensagem: "Falha ao excluir agendamento " + e})
  }
});


module.exports = router;