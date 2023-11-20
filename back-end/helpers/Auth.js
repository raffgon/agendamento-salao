const jwt = require('jsonwebtoken');


module.exports = {
    verificaAdmin: (req, res, next) => {
        
    },
    validaAcesso: (req, res, next) => {
        try{
            let bearerToken = req.headers.authorization || '';
            let token = bearerToken.split(' ');
            if(token[0] == 'Bearer'){
                token = token[1];
            }
            jwt.verify(token, '321@!#', (err, decoded) => {
                if(err){
                    return res.status(401).json({ mensagem: 'Token inválido ou expirado, acesso negado' });
                }else{
                    req.usuario = decoded;
                    next();
                }
            })
        } catch(e){

        }
    }
}