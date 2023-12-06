var express = require('express');
var router = express.Router();

const Salao = require('../model/Salao');
const Auth = require('../helpers/Auth');

router.post('/novo', Auth.validaAcesso, Auth.verificaAdmin, async function (req, res) {
  try {
    let salao = await Salao.Model.novo(req.body.id_dono, req.body.nome_salao, req.body.endereco_salao, req.body.fone_salao);
    res.json({mensagem: "Salao criado com sucesso", salao: salao});
  } catch (e) {
    res.status(400).json({ mensagem: "Falha ao salvar salao" + " Erro:" + e })
  }
});

router.get('/listar', Auth.validaAcesso, Auth.verificaAdmin, async function (req, res) {
  try {
    let saloes = await Salao.listar();
    res.json({ saloes: saloes });
  } catch (e) {
    res.status(400).json({ mensagem: "Falha ao buscar saloes" + " Erro:" + e })
  }
});

router.put('/editar' , Auth.validaAcesso, Auth.verificaAdmin, async function (req, res) {
  try {
    await Salao.editar(req.headers.usuario_logado, req.body.id_salao, req.body.nome_salao, req.body.endereco_salao, req.body.fone_salao);
    let salao = await Salao.buscaPorId(req.body.id_salao);
    res.json({mensagem: "Salao editado com sucesso", salao: salao});
  }
  catch (e) {
    res.status(400).json({ mensagem: "Falha ao editar salao" + " Erro:" + e })
  }
});

module.exports = router;