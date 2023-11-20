var express = require('express');
var router = express.Router();

const Usuario = require('../model/Usuario');

router.post('/novo', async function (req, res, next) {
  try {
    const existeUsuario = await Usuario.findOne({ where: { email_usuario: req.body.email_usuario } });
    if (existeUsuario) {
      return res.status(400).json({ mensagem: "Já existe um usuário com o mesmo email" });
    }
    let usuario = await Usuario.novo(req.body.nome_usuario, req.body.email_usuario, req.body.senha_usuario, req.body.isAdmin || false);
    res.json({ usuario: usuario });
  } catch (e) {
    res.status(400).json({ mensagem: "Falha ao salvar usuário" + e });
  }
});

router.get('/listar', async function (req, res, next) {
  try {
    let usuarios = await Usuario.getAll();
    res.json({ usuarios: usuarios });
  } catch (e) {
    res.status(400).json({ mensagem: "Falha ao buscar usuarios" + e })
  }
});

router.put('/makeAdmin', async function (req, res, next) {
  try {
    let usuario = await Usuario.makeAdmin(req.body.id_usuario);
    res.json({ usuario: usuario });
  } catch (e) {
    res.status(400).json({ mensagem: "Falha ao dar permissão de admin" + e })
  }
});

module.exports = router;