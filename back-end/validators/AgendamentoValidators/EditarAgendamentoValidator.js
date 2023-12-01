const Joi = require('joi');

const EditarAgendamentoSchema = Joi.object({
    
  id_agendamento: Joi.number().integer().messages({
    'number.base': 'ID do agendamento inválido. O ID deve ser um número inteiro'
  }).required('ID do agendamento é obrigatório'),

  novo_agendamento: Joi.object({

    id_usuario: Joi.number().integer().messages({
      'number.base': 'ID do usuário inválido. O ID deve ser um número inteiro'
    }).required('ID do usuário é obrigatório'),

    id_funcionario: Joi.number().integer().messages({
      'number.base': 'ID do funcionário inválido. O ID deve ser um número inteiro'
    }).required('ID do funcionário é obrigatório'),

    id_servico: Joi.number().integer().messages({
      'number.base': 'ID do serviço inválido. O ID deve ser um número inteiro'
    }).required('ID do serviço é obrigatório'),

    id_horario: Joi.number().integer().messages({
      'number.base': 'ID do horário inválido. O ID deve ser um número inteiro'
    }).required('ID do horário é obrigatório'),

    status_agendamento: Joi.string().trim().valid('confirmado', 'cancelado').messages({
      'string.empty': 'Status de agendamento é obrigatorio.',
      'any.only': 'Status de agendamento inválido. O status deve ser (confirmado) ou (cancelado)'
    }).required('Status de agendamento é obrigatório')

  }).required('Novo agendamento é obrigatório')
});

module.exports = EditarAgendamentoSchema;