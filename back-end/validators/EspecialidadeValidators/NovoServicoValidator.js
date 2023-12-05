const Joi = require('joi');

const NovoServicoSchema = Joi.object({

    id_especialidade: Joi.number().integer().messages({
        'number.base': 'ID da especialidade inválido. O ID deve ser um número inteiro'
    }).required(),

    nome_servico: Joi.string().trim().messages({
        'string.empty': 'O nome do servico é obrigatorio',
    }).required(),

    custo_servico: Joi.number().integer().messages({
        'number.base': 'Custo do servico inválido. O custo deve ser um número inteiro'
    }).required(),

    duracao_servico: Joi.number().integer().messages({
        'number.base': 'Duração do servico inválida. A duração deve ser um número inteiro'
    })
})

module.exports = NovoServicoSchema;