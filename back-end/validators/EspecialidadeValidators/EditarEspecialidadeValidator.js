const Joi = require('joi');

const EditarEspecialidadeSchema = Joi.object({

    id_especialidade: Joi.number().integer().messages({
        'number.base': 'ID da especialidade inválido. O ID deve ser um número inteiro'
    }),

    nome_especialidade: Joi.string().trim().messages({
        'string.empty': 'O nome da especialidade é obrigatorio',
    })
})

module.exports = EditarEspecialidadeSchema