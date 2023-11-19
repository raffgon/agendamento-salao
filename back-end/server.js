const express = require('express')

const app = express()
const port = 5500

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var usuarioRouter = require('./routes/usuarioRouter');
var indexRouter = require('./routes/indexRouter');
var salaoRouter = require('./routes/salaoRouter');
var FuncionarioRouter = require('./routes/FuncionarioRouter');
var EspecialidadeRouter = require('./routes/EspecialidadeRouter');
var AgendamentoRouter = require('./routes/AgendamentoRouter');

app.use('/saloes', salaoRouter);
app.use('/funcionarios', FuncionarioRouter);
app.use('/especialidades', EspecialidadeRouter);
app.use('/usuarios', usuarioRouter);
app.use('/agendamentos', AgendamentoRouter);
app.use('/', indexRouter);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});