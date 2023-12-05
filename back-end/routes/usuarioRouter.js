var express = require('express');
var router = express.Router();

const Auth = require('../helpers/Auth');
const Usuario = require('../model/Usuario');
const Paginacao = require('../helpers/Paginacao');

const EditarUsuarioSchema = require('../validators/UsuarioValidators/EditarUsuarioValidator');

const GenericIdSchema = require('../validators/GenericIdValidator');

router.get('/listar', async function (req, res, next) {
  try {

    let usuarios = await Usuario.listar();
    let pagina = req.query.pagina;
    let limite = req.query.limite;
    const resultado = Paginacao.paginar(usuarios, pagina, limite);
    res.json({ usuarios: resultado });
  } catch (e) {
    res.status(400).json({ mensagem: "Falha ao buscar usuarios" + e })
  }
});

router.put('/editar', Auth.validaAcesso, async function (req, res) {
  const {error} = EditarUsuarioSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessages = error.details.map(detail => detail.message);
    return res.status(400).json({ mensagem: errorMessages });
  }
  try {
    let usuario = await Usuario.editar(req.body.id_usuario, req.body.novo_usuario, req.headers.usuario_logado);
    res.json({ mensagem: "Usuario editado com sucesso", usuario: usuario });
  } catch (e) {
    res.status(400).json({ mensagem: "Falha ao alterar usuario: " + e })
  }
});

router.delete('/excluir', Auth.validaAcesso, Auth.verificaAdmin, async function (req, res, next) {
  const {error} = GenericIdSchema.validate(req.body);
  if (error) {
    const errorMessages = error.details.map(detail => detail.message);
    return res.status(400).json({ mensagem: errorMessages });
  }
  try {
    await Usuario.excluir(req.body.id_usuario);
    res.json('Usuario excluido com sucesso');
  } catch (e) {
    res.status(400).json({ mensagem: "Falha ao excluir usuario: " + e })
  }
})

router.put('/makeAdmin', Auth.validaAcesso, Auth.verificaAdmin, async function (req, res, next) {
  const {error} = GenericIdSchema.validate(req.body);
  if (error) {
    const errorMessages = error.details.map(detail => detail.message);
    return res.status(400).json({ mensagem: errorMessages });
  }
  try {
    let usuario = await Usuario.makeAdmin(req.body.id_usuario);
    res.json({ usuario: usuario });
  } catch (e) {
    res.status(400).json({ mensagem: "Falha ao dar permissão de admin: " + e })
  }
});

router.put('/removeAdmin', async function (req, res, next) {
  const {error} = GenericIdSchema.validate(req.body);
  if (error) {
    const errorMessages = error.details.map(detail => detail.message);
    return res.status(400).json({ mensagem: errorMessages });
  }
  try {
    let usuario = await Usuario.removeAdmin(req.body.id_usuario);
    res.json({ usuario: usuario });
  } catch (e) {
    res.status(400).json({ mensagem: "Falha ao remover permissão de admin: " + e })
  }
});

module.exports = router;