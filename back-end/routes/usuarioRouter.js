var express = require('express');
var router = express.Router();

const UsuarioModel = require('../model/Usuario');

router.post('/novo', async function(req, res, next) {
    try {
        let usuario = await UsuarioModel.novo(req.body.nome_usuario, req.body.email_usuario, req.body.senha_usuario);
        
        res.json({usuario: usuario});
      } catch(e) {
        res.status(400).json({mensagem: "Falha ao salvar usuario" + e})
      }
});

module.exports = router;