const express = require('express')
//const cors = require('cors')

require('dotenv').config();

const app = express()
const port = process.env.SERVER_PORT;


//cors utilizado apenas para o trabalho de mobile
/*
app.use(cors({
    origin: 'http://localhost:5501',
    credentials: true
  }));
*/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
    console.log(`Servidor da API rodando em http://localhost:${port}`);
});