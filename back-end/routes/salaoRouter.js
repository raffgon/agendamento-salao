var express = require('express');
var router = express.Router();

const SalaoModel = require('../model/Salao');

router.post('/novo', async function(req, res, next) {
    try {
        let salao = await SalaoModel.novo(req.body.id_dono, req.body.nome_salao, req.body.endereco_salao, req.body.fone_salao);
        
        res.json({salao: salao});
      } catch(e) {
        res.status(400).json({mensagem: "Falha ao salvar salao" + "       Erro:" + e})
      }
});

module.exports = router;