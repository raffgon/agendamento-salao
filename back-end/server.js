const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var IndexRouter = require('./routes/IndexRouter');
var SalaoRouter = require('./routes/SalaoRouter');
var FuncionarioRouter = require('./routes/FuncionarioRouter');
var EspecialidadeRouter = require('./routes/EspecialidadeRouter');
var AgendamentoRouter = require('./routes/AgendamentoRouter');
var UsuarioRouter = require('./routes/UsuarioRouter');

app.use('/', IndexRouter);
app.use('/usuarios', UsuarioRouter);
app.use('/saloes', SalaoRouter);
app.use('/funcionarios', FuncionarioRouter);
app.use('/especialidades', EspecialidadeRouter);
app.use('/agendamentos', AgendamentoRouter);

app.use(express.static('public'));

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');

app.use('/documentacao', swaggerUi.serve);
app.get('/documentacao', swaggerUi.setup( swaggerFile ));

app.listen(port, () => {
  console.log(`Servidor da API rodando em http://localhost:${port}`);
});