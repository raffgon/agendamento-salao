const Joi = require('joi');

const NovaEspecialidadeSchema = Joi.object({
  nome_especialidade: Joi.string()
    .trim()
    .required()
    .messages({
      'string.empty': 'O nome da especialidade é obrigatório',
    }),
});

module.exports = NovaEspecialidadeSchema;