var express = require('express');
var router = express.Router();

const Usuario = require('../model/Usuario');

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