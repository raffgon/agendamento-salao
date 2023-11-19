var express = require('express');
var router = express.Router();

const AgendamentoModel = require('../model/Agendamento');

router.post('/novo', async function(req, res, next) {
    try {
        let agendamento = await AgendamentoModel.novo(req.body.id_usuario, req.body.id_funcionario, req.body.id_servico, req.body.data_agendamento);
        res.json({agendamento: agendamento});
      } catch(e) {
        res.status(400).json({mensagem: "Falha ao salvar funcionario" + " Erro:" + e})
      }
});

module.exports = router;