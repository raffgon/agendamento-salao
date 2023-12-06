const Joi = require('joi');

const NovoHorarioSchema = Joi.object({
  id_funcionario: Joi.number()
    .integer()
    .messages({
      'number.base': 'ID do funcionário inválido. O ID deve ser um número inteiro',
    })
    .required(),
    dia_semana_horario: Joi.string()
      .valid('segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado', 'domingo')
      .required()
      .messages({
        'any.only': 'O dia da semana deve ser válido (segunda, terça, quarta, quinta, sexta, sábado, domingo)',
        'any.required': 'O dia da semana é obrigatório',
        'string.empty': 'O dia da semana não pode estar vazio',
      }),
    inicio_horario: Joi.date()
      .iso()
      .required()
      .messages({
        'date.format': 'O formato do horário de início deve ser Ex: 2023-12-23T22:45:00Z',
        'any.required': 'O horário de início é obrigatório',
        'string.empty': 'O horário de início não pode estar vazio',
      }),
    fim_horario: Joi.date()
      .iso()
      .greater(Joi.ref('inicio_horario'))
      .required()
      .messages({
        'date.format': 'O formato do horário de fim deve Ex: 2023-12-23T22:45:00Z',
        'date.greater': 'O horário de fim deve ser posterior ao horário de início',
        'any.required': 'O horário de fim é obrigatório',
        'string.empty': 'O horário de fim não pode estar vazio',
      }),
    status_horario: Joi.string()
    .valid('disponível')
      .required()
      .messages({
        'any.required': 'O status do horário é obrigatório',
        'string.empty': 'O status do horário não pode estar vazio',
        'any.only': 'O status do horário deve ser (disponível)'
      })
});

module.exports = NovoHorarioSchema;