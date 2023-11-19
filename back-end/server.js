const express = require('express')

const app = express()
const port = 5500

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var usuarioRouter = require('./routes/usuarioRouter');
var indexRouter = require('./routes/indexRouter');
var salaoRouter = require('./routes/salaoRouter');

app.use('/saloes', salaoRouter);
app.use('/usuarios', usuarioRouter);
app.use('/', indexRouter);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});