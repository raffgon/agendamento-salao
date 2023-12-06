const Joi = require('joi');

const NovoFuncionarioSchema = Joi.object({
    id_usuario: Joi.number().integer().messages({
        'number.base': 'ID do usuario inválido. O ID deve ser um número inteiro'
    }).required(),

    id_salao: Joi.number().integer().messages({
        'number.base': 'ID do salão inválido. O ID deve ser um número inteiro'
    }).required(),

    apelido_funcionario: Joi.string().trim().messages({
        'string.empty': 'O apelido do funcionario é obrigatorio.',
    }).required(),
})

module.exports = NovoFuncionarioSchema
