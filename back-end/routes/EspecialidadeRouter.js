var express = require('express');
var router = express.Router();

const Especialidade = require('../model/Especialidade');
const Servico = require('../model/Servico');
const Auth = require('../helpers/Auth');

const GenericIdSchema = require('../validators/GenericIdValidator');

const NovaEspecialidadeSchema = require('../validators/EspecialidadeValidators/NovaEspecialidadeValidator');

const EditarEspecialidadeSchema = require('../validators/EspecialidadeValidators/EditarEspecialidadeValidator');

const NovoServicoSchema = require('../validators/EspecialidadeValidators/NovoServicoValidator');

router.post('/novo', Auth.validaAcesso, Auth.verificaAdmin, async function(req, res) {
  const {error} = NovaEspecialidadeSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessages = error.details.map(detail => detail.message);
    return res.status(400).json({ mensagem: errorMessages });
  }
  try {
    let especialidade = await Especialidade.novo(req.body.nome_especialidade);
    res.json({mensagem: "Esécialidade criada com sucesso", especialidade: especialidade});
  } catch(e) {
    res.status(400).json({mensagem: "Falha ao salvar especialidade  " + e})
  }
});

router.get('/listar', async function(req, res) {
  try {
    let especialidades = await Especialidade.Model.findAll();
    res.json({especialidades: especialidades});
  } catch(e) {
    res.status(400).json({mensagem: "Falha ao buscar especialidades " + e})
  }
});

router.put('/editar', Auth.validaAcesso, Auth.verificaAdmin, async function(req, res) {
  /*TESTE DE VERIFICAÇÃO DE ESTRUTURA DO JSON
  if(req.body.id_especialidade == undefined || req.body.nome_especialidade){
    return res.status(400).json({ mensagem: "Requisição incompleta" });
  }
  */
  const {error} = EditarEspecialidadeSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessages = error.details.map(detail => detail.message);
    return res.status(400).json({ mensagem: errorMessages });
  }
  try {
    let especialidade = await Especialidade.editar(req.body.id_especialidade, req.body.nome_especialidade);
    res.json({ mensagem: "Especialidade editada com sucesso", especialidade: especialidade });
  } catch(e) {
    res.status(400).json({mensagem: "Falha ao editar especialidade " + e})
  }
});

/*
DIFICULDADE NA IMPLEMENTAÇÃO DE DELETAR ESPECIALIDADE POIS ESTA RELACIONADA COM MUITAS TABELAS
*/
router.delete('/excluir', Auth.validaAcesso, Auth.verificaAdmin, async function(req, res) {
  const {error} = GenericIdSchema.validate(req.body);
  if (error) {
    const errorMessages = error.details.map(detail => detail.message);
    return res.status(400).json({ mensagem: errorMessages });
  }
  try {
    let especialidadeExcluida = await Especialidade.Model.findOne({where: {id_especialidade: req.body.id_especialidade}});
    await Especialidade.excluir(req.body.id_especialidade);
    res.json({ mensagem: "Especialidade escluida com sucesso", especialidade: especialidadeExcluida });
  } catch(e) {
    res.status(400).json({mensagem: "Falha ao excluir especialidade " + e})
  }
})

router.post('/novoServico', Auth.validaAcesso, Auth.verificaAdmin, async function(req, res) {
  const {error} = NovoServicoSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessages = error.details.map(detail => detail.message);
    return res.status(400).json({ mensagem: errorMessages });
  }
  try {
    let servico = await Servico.novo(req.body.id_especialidade, req.body.nome_servico, req.body.custo_servico, req.body.duracao_servico);
    res.json({mensagem: "Servico criado com sucesso", servico: servico});
  } catch(e) {
    res.status(400).json({mensagem: "Falha ao salvar servico" + e})
  }
});

router.get('/listarServicosPorEspecialidade', async function(req, res) {
  const {error} = GenericIdSchema.validate(req.body);
  if (error) {
    const errorMessages = error.details.map(detail => detail.message);
    return res.status(400).json({ mensagem: errorMessages });
  }
  try {
    let servicos = await Servico.getAllByEspecialidade(req.body.id_especialidade);
    res.json({servicos: servicos});
  } catch(e) {
    res.status(400).json({mensagem: "Falha ao buscar servicos " + e})
  }
});

module.exports = router;