var express = require('express');
var router = express.Router();

const Funcionario = require('../model/Funcionario');
const FuncionarioEspecialidade = require('../model/FuncionarioEspecialidade');
const Horario = require('../model/Horario');
const Auth = require('../helpers/Auth');

router.post('/novo', Auth.validaAcesso, Auth.verificaAdmin, async function(req, res, next) {
  try {
    let funcionario = await Funcionario.novo(req.body.id_usuario, req.body.id_salao, req.body.apelido_funcionario);
    res.json({funcionario: funcionario});
  } catch(e) {
    res.status(400).json({mensagem: "Falha ao salvar funcionario. " + e})
  }
});

router.post('/novaEspecialidade', Auth.validaAcesso, Auth.verificaAdmin, async function(req, res, next) {
  try {
    let novaEspecialidade = await FuncionarioEspecialidade.novo(req.body.id_funcionario, req.body.id_especialidade);
    res.json({novaEspecialidade: novaEspecialidade});
  } catch(e) {
    res.status(400).json({mensagem: "Falha ao salvar especialidade " + e})
  }
});

router.post('/novoHorario', Auth.validaAcesso, Auth.verificaAdmin, async function(req, res, next) {
  try {
    let novoHorario = await Horario.novo(req.body.id_funcionario, req.body.dia_semana_horario, req.body.inicio_horario, req.body.fim_horario, req.body.status_horario);
    res.json({novoHorario: novoHorario});
  } catch(e) {
    res.status(400).json({mensagem: "Falha ao salvar horário " + e})
  }
});

router.get('/listarHorariosPorId', Auth.validaAcesso, async function(req, res, next) {
  try {
    let horarios = await Horario.getAllbyId(req.body.id_funcionario);
    res.json({horarios: horarios});
  } catch(e) {
    res.status(400).json({mensagem: "Falha ao buscar horários " + e})
  }
});

router.post('/listarHorariosDisponiveisPorId', /*Auth.validaAcesso,*/ async function(req, res, next) {
  try {
    let horarios = await Horario.getDisponiveisbyId(req.body.id_funcionario);
    res.json({horarios: horarios});
  } catch(e) {
    res.status(400).json({mensagem: "Falha ao buscar horários " + e})
  }
});

router.post('/listarFuncionariosPorEspecialidade', async function(req, res, next) {
  try {
    let funcionarios = await FuncionarioEspecialidade.getAllByEspecialidade(req.body.id_especialidade);
    res.json({funcionarios: funcionarios});
  } catch(e) {
    res.status(400).json({mensagem: "Falha ao buscar funcionários " + e})
  }
})
module.exports = router;