const express = require('express')

const app = express()
const port = 5500

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const cookieParser = require('cookie-parser');


var IndexRouter = require('./routes/IndexRouter');
var SalaoRouter = require('./routes/SalaoRouter');
var FuncionarioRouter = require('./routes/FuncionarioRouter');
var EspecialidadeRouter = require('./routes/EspecialidadeRouter');
var AgendamentoRouter = require('./routes/AgendamentoRouter');
var UsuarioRouter = require('./routes/UsuarioRouter');

app.use('/saloes', SalaoRouter);
app.use('/funcionarios', FuncionarioRouter);
app.use('/especialidades', EspecialidadeRouter);
app.use('/usuarios', UsuarioRouter);
app.use('/agendamentos', AgendamentoRouter);
app.use('/', IndexRouter);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});