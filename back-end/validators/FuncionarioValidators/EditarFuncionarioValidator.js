const Joi = require('joi');

const EditarFuncionarioSchema = Joi.object({
    
  id_funcionario: Joi.number().integer().messages({
    'number.base': 'ID do funcionario inválido. O ID deve ser um número inteiro'
  }).required(),

  novo_funcionario: Joi.object({
    
    id_salao: Joi.number().integer().messages({
      'number.base': 'ID do salão inválido. O ID deve ser um número inteiro'
    }),

    apelido_funcionario: Joi.string().trim().messages({
        'string.empty': 'Apelido do funcionário é obrigatorio.',
    })

  }).required('Novo funcionario é invalido')
});

module.exports = EditarFuncionarioSchema;