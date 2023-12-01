const Joi = require('joi');

const GenericIdSchema = Joi.object().pattern(
  Joi.string(), 
  Joi.number().integer().required()
).messages({
    'number.base': 'ID não aceito, campo vazio ou inválido. O ID deve ser um número inteiro'
});

module.exports = GenericIdSchema;