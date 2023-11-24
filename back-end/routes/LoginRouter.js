var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/login', async function (req, res, next) {
    try {
        const usuario = await UsuarioModel.findOne({ email: email });
        if (!usuario) {
            return res.status(401).json({ mensagem: 'Email não cadastrado' });
        }
        if (usuario.senha !== senha) {
            return res.status(401).json({ mensagem: 'Credenciais inválidas' });
        }
        
        const token = jwt.sign({ id: usuario.id }, 'chave-secreta', {expiresIn: '1 min'});
        res.send('Usuario logado, seu token: ', { token: token });
        res.json('Usuario logado, seu token: ', { token: token });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao fazer login: ' + error.message });
    }
})