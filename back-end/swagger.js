const swaggerAutogen = require('swagger-autogen')();

output = './swagger_output.json';
endpoints = ['./server.js'];

const doc = {
    info: {
      version: '1.0',
      title: 'API AGENDAMENTOS-SALAO',
      description: 'API PARA GERENCIAMENTO DE AGENDAMENTOS NO SALAO'
    }
  };

  swaggerAutogen(output, endpoints, doc).then(() => {
    require('./server.js')
})