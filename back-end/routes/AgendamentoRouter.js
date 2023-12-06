var express = require('express');
var router = express.Router();
const AgendamentoEditarSchema = require('../validators/AgendamentoValidators/EditarAgendamentoValidator');
const AgendamentoNovoSchema = require('../validators/AgendamentoValidators/NovoAgendamentoValidator');
const GenericIdSchema = require('../validators/GenericIdValidator');
const Agendamento = require('../model/Agendamento');
const Auth = require('../helpers/Auth');
const Paginacao = require('../helpers/Paginacao');

router.post('/novo', Auth.validaAcesso , async function(req, res) {
  const {error} = AgendamentoNovoSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessages = error.details.map(detail => detail.message);
    return res.status(400).json({ mensagem: errorMessages });
  }
  try {
    let agendamento = await Agendamento.novo(req.body.id_usuario, req.body.id_funcionario, req.body.id_servico, req.body.id_horario, req.body.status_agendamento);
    res.json({mensagem: "Agendamento marcado com sucesso", agendamento: agendamento});
  } catch(e) {
    res.status(400).json({mensagem: "Falha ao salvar agendamento " + e})
  }
});

router.get('/listar', Auth.validaAcesso, async function(req, res) {
  //IMPLEMENTADA A PAGINAÇÃO, QUE PODE SER IMPLEMENTADA EM QUALQUER ROTA DE LISTAGEM
  try {
    let agendamentos = await Agendamento.listar();
    let pagina = req.query.pagina;
    let limite = req.query.limite;
    const resultado = Paginacao.paginar(agendamentos, pagina, limite);
    res.json({agendamentos: resultado});
  } catch(e) {
    res.status(400).json({mensagem: "Falha ao buscar agendamento " + e})
  }
});

router.put('/editar', Auth.validaAcesso, async function(req, res) {
  const {error} = AgendamentoEditarSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessages = error.details.map(detail => detail.message);
    return res.status(400).json({ mensagem: errorMessages });
  }
  try {
    await Agendamento.editar(req.body.id_agendamento, req.body.novo_agendamento);
    let agendamento = await Agendamento.buscaPorId(req.body.id_agendamento);
    res.json({mensagem: "Agendamento editado com sucesso", agendamentAntigo: agendamento, agendamentoNovo: req.body.novo_agendamento});
  } catch(e) {
    res.status(400).json({mensagem: "Falha ao editar agendamento " + e})
  }
});

router.delete('/excluir', Auth.validaAcesso, Auth.verificaAdmin, async function(req, res) {
  const {error} = GenericIdSchema.validate(req.body);
  if (error) {
    const errorMessages = error.details.map(detail => detail.message);
    return res.status(400).json({ mensagem: errorMessages });
  }
  try {
    await Agendamento.excluir(req.body.id_agendamento);
    res.json('Agendamento excluido com sucesso');
  } catch(e) {
    res.status(400).json({mensagem: "Falha ao excluir agendamento " + e})
  }
});

router.put('/cancelar', Auth.validaAcesso, async function(req, res) {
  const {error} = GenericIdSchema.validate(req.body);
  if (error) {
    const errorMessages = error.details.map(detail => detail.message);
    return res.status(400).json({ mensagem: errorMessages });
  }
  try {
    await Agendamento.cancelar(req.body.id_agendamento);
    let agendamento = await Agendamento.buscaPorId(req.body.id_agendamento);
    res.json({mensagem: "Agendamento cancelado com sucesso", agendamento: agendamento});
  } catch(e) {
    res.status(400).json({mensagem: "Falha ao cancelar agendamento " + e})
  }
});

router.get('/getAgendamentoPorCliente', Auth.validaAcesso, async function(req, res) {
  const {error} = GenericIdSchema.validate(req.body);
  if (error) {
    const errorMessages = error.details.map(detail => detail.message);
    return res.status(400).json({ mensagem: errorMessages });
  }
  try {
    let agendamentos = await Agendamento.getAgendamentoByCliente(req.body.id_usuario);
    let pagina = req.query.pagina;
    let limite = req.query.limite;
    const resultado = Paginacao.paginar(agendamentos, pagina, limite);
    res.json({agendamentos: resultado});
  } catch(e) {
    res.status(400).json({mensagem: "Falha ao buscar agendamento " + e})
  }
});

module.exports = router;