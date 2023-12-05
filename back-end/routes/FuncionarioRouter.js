var express = require('express');
var router = express.Router();

const Funcionario = require('../model/Funcionario');
const FuncionarioEspecialidade = require('../model/FuncionarioEspecialidade');
const Horario = require('../model/Horario');
const Auth = require('../helpers/Auth');

const NovoFuncionarioSchema = require('../validators/FuncionarioValidators/NovoFuncionarioValidator');
const GenericIdSchema = require('../validators/GenericIdValidator');
const EditarFuncionarioSchema = require('../validators/FuncionarioValidators/EditarFuncionarioValidator');
const NovoHorarioSchema = require('../validators/FuncionarioValidators/NovoHorariovalidator');

router.post('/novo', Auth.validaAcesso, Auth.verificaAdmin, async function(req, res, next) {
  const {error} = NovoFuncionarioSchema.validate(req.body, { abortEarly: false });
  if (error) {
      const errorMessages = error.details.map(detail => detail.message);
      return res.status(400).json({ mensagem: errorMessages });
  }
  try {
    let funcionario = await Funcionario.novo(req.body.id_usuario, req.body.id_salao, req.body.apelido_funcionario);
    res.json({ mensagem: "Funcionario criado com sucesso", funcionario: funcionario });
  } catch(e) {
    res.status(400).json({mensagem: "Falha ao salvar funcionario. " + e})
  }
});

router.post('/novaEspecialidade', Auth.validaAcesso, Auth.verificaAdmin, async function(req, res, next) {
  const {error} = GenericIdSchema.validate(req.body);
  if (error) {
    const errorMessages = error.details.map(detail => detail.message);
    return res.status(400).json({ mensagem: errorMessages });
  }
  try {
    let especialidade = await FuncionarioEspecialidade.novo(req.body.id_funcionario, req.body.id_especialidade);
    res.json({ mensagem: "Especialidade adicionada com sucesso", especialidade: especialidade });
  } catch(e) {
    res.status(400).json({mensagem: "Falha ao salvar especialidade " + e})
  }
});

router.post('/novoHorario', Auth.validaAcesso, Auth.verificaAdmin, async function(req, res, next) {
  const {error} = NovoHorarioSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessages = error.details.map(detail => detail.message);
    return res.status(400).json({ mensagem: errorMessages });
  }
  try {
    let horario = await Horario.novo(req.body.id_funcionario, req.body.dia_semana_horario, req.body.inicio_horario, req.body.fim_horario, req.body.status_horario);
    res.json({ mensagem: "Horario criado com sucesso", horario: horario });
  } catch(e) {
    res.status(400).json({mensagem: "Falha ao salvar horário " + e})
  }
});

router.get('/listarHorariosPorId', Auth.validaAcesso, async function(req, res, next) {
  const {error} = GenericIdSchema.validate(req.body);
  if (error) {
    const errorMessages = error.details.map(detail => detail.message);
    return res.status(400).json({ mensagem: errorMessages });
  }
  try {
    let horarios = await Horario.getAllbyId(req.body.id_funcionario);
    res.json({horarios: horarios});
  } catch(e) {
    res.status(400).json({mensagem: "Falha ao buscar horários " + e})
  }
});

router.post('/listarHorariosDisponiveisPorId', /*Auth.validaAcesso,*/ async function(req, res, next) {
  const {error} = GenericIdSchema.validate(req.body);
  if (error) {
    const errorMessages = error.details.map(detail => detail.message);
    return res.status(400).json({ mensagem: errorMessages });
  }
  try {
    let horarios = await Horario.getDisponiveisbyId(req.body.id_funcionario);
    res.json({horarios: horarios});
  } catch(e) {
    res.status(400).json({mensagem: "Falha ao buscar horários " + e})
  }
});

router.post('/listarFuncionariosPorEspecialidade', async function(req, res, next) {
  const {error} = GenericIdSchema.validate(req.body);
  if (error) {
    const errorMessages = error.details.map(detail => detail.message);
    return res.status(400).json({ mensagem: errorMessages });
  }
  try {
    let funcionarios = await FuncionarioEspecialidade.getAllByEspecialidade(req.body.id_especialidade);
    res.json({funcionarios: funcionarios});
  } catch(e) {
    res.status(400).json({mensagem: "Falha ao buscar funcionários " + e})
  }
});

router.get('/listarTodosHorarios', async function (req, res, next) {
  try {
    let horarios = await Horario.listar();
    res.json({ horarios: horarios });
  } catch (e) {
    res.status(400).json({ mensagem: "Falha ao buscar horários" + e })
  }
});

router.get('/listar', async function (req, res, next) {
  try {
    let funcionarios = await Funcionario.listar();
    res.json({ funcionarios: funcionarios });
  } catch (e) {
    res.status(400).json({ mensagem: "Falha ao buscar funcionarios" + e })
  }
});

router.delete('/excluir', Auth.validaAcesso, Auth.verificaAdmin, async function (req, res, next) {
  const {error} = GenericIdSchema.validate(req.body);
  if (error) {
    const errorMessages = error.details.map(detail => detail.message);
    return res.status(400).json({ mensagem: errorMessages });
  }
  try {
    let funcionarioExcluido = await Funcionario.Model.findOne({
      where: {
          id_funcionario: req.body.id_funcionario
      }
  });
    await Funcionario.excluir(req.body.id_funcionario);
    res.json({ mensagem: "Funcionario excluido com sucesso", funcionario_excluido: funcionarioExcluido });
  } catch (e) {
    res.status(400).json({ mensagem: "Falha ao excluir funcionario" + e })
  }
});

router.put('/editar', Auth.validaAcesso, Auth.verificaAdmin, async function (req, res, next) {
  const {error} = EditarFuncionarioSchema.validate(req.body, { abortEarly: false });
  if (error) {
      const errorMessages = error.details.map(detail => detail.message);
      return res.status(400).json({ mensagem: errorMessages });
  }
  try {
    let funcionario = await Funcionario.editar(req.body.id_funcionario, req.body.novo_funcionario);
    res.json({ mensagem: "Funcionario editado com sucesso", funcionario: funcionario });
  } catch (e) {
    res.status(400).json({ mensagem: "Falha ao editar funcionario" + e })
  }
})
module.exports = router;