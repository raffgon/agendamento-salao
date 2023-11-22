const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')

const app = express()
const port = 5501


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
    if(req.cookies.id_usuario) {
        console.log('Usuario ja está logado');
        res.redirect('/');
        return;
    }
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});



app.listen(port, (req, res) => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});