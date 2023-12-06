const Joi = require('joi');

const UsuarioLoginSchema = Joi.object({
    email_usuario: Joi.string().trim().required().messages({
      'string.empty': 'O email é obrigatório',
    }),
    senha_usuario: Joi.string().trim().required().messages({
      'string.empty': 'A senha é obrigatória',
    }),
})

module.exports = UsuarioLoginSchema
