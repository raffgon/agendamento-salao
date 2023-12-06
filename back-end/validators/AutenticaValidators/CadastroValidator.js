const Joi = require('joi');

const UsuarioCadastroSchema = Joi.object({
    nome_usuario: Joi.string().trim().required().messages({
        'string.empty': 'O nome de usuário é obrigatório',
      }),
      email_usuario: Joi.string().trim().required().messages({
        'string.empty': 'O email é obrigatório',
      }),
      senha_usuario: Joi.string().trim().required().messages({
        'string.empty': 'A senha é obrigatória',
      }),
})

module.exports = UsuarioCadastroSchema
