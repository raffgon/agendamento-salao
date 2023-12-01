const Joi = require('joi');

const AgendamentoNovoSchema = Joi.object({
  id_usuario: Joi.number().integer().required().messages({
    'number.base': 'O ID do usuário deve ser um número inteiro nem pode estar vazio',
  }),
  id_funcionario: Joi.number().integer().required().messages({
    'number.base': 'O ID do funcionário deve ser um número inteiro nem pode estar vazio',
  }),
  id_servico: Joi.number().integer().required().messages({
    'number.base': 'O ID do serviço deve ser um número inteiro nem pode estar vazio',
  }),
  id_horario: Joi.number().integer().required().messages({
    'number.base': 'O ID do horário deve ser um número inteiro nem pode estar vazio',
  }),
  status_agendamento: Joi.string().required().messages({
    'string.empty': 'O status do agendamento é obrigatório nem pode estar vazio',
  }),
});

module.exports = AgendamentoNovoSchema;