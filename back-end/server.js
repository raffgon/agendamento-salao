const express = require('express')
const { Pool } = require('pg')
const path = require('path')
const bodyParser = require('body-parser')

// Crie uma instância do Express
const app = express()
const port = 5500

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Configure a conexão com o banco de dados
const pool = new Pool({

  user: 'postgres',
  password: '0607',
  host: '127.0.0.1',
  port: '5432',
  database: 'AgendamentosBD',
});

// Crie uma instância do Express
app.get('/agendamentos', async (req, res) => {
    try {
      const resultado = await pool.query("SELECT * FROM AGENDAMENTOS")
      res.json(resultado.rows)
    } catch (ex) {
      console.log('Ocorreu um erro ao realizar a consulta: ' + ex)
      res.status(500).json({ error: 'Erro ao consultar' })
    }
});


  // Inicie o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send('Bem-vindo à página inicial');
});