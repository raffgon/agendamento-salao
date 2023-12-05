const Joi = require('joi');

const EditarUsuarioSchema = Joi.object({
    
  id_usuario: Joi.number().integer().messages({
    'number.base': 'ID do usuario inválido. O ID deve ser um número inteiro'
  }).required(),

  novo_usuario: Joi.object({

    nome_usuario: Joi.string().trim().messages({
        'string.empty': 'Nome de usuario é obrigatorio.',
      }).required(),
    
    email_usuario: Joi.string().trim().messages({
        'string.empty': 'Email é obrigatorio.',
    }).required(),

    senha_usuario: Joi.string().trim().messages({
        'string.empty': 'Senha é obrigatorio.',
    }).required()

  }).required('Novo usuario é invalido')
});

module.exports = EditarUsuarioSchema;