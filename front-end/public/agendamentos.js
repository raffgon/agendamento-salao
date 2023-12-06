btnMeusAgendamentos = document.getElementById('btnMeusAgendamentos');

const btnLoggout = document.getElementById('btnLoggout');


const novoAgendamento = {
    id_usuario: localStorage.getItem('id_usuario'),
    id_funcionario: null,
    id_servico: null,
    id_horario: null,
    status_agendamento: null
}

let agendamentoDelete;
let especialidadeSelecionada;
//objeto para confirmar agendamento com as informaçoes de uma maneira que o usuario pode ver armzaenado no local storag

btnMeusAgendamentos.addEventListener('click', async (event) => {
    event.preventDefault();
    listarAgendamentos();
});

const btnAgendar = document.getElementById('btnAgendar');
btnAgendar.addEventListener('click', async (event) => {
    event.preventDefault();
    listarEspecialidades();
});

btnLoggout.addEventListener('click', async (event) => {
    event.preventDefault();
    localStorage.removeItem('id_usuario');
    localStorage.removeItem('token');

    if (!localStorage.getItem('id_usuario') || !localStorage.getItem('token')) {
        alert('Usuário deslogado');
        window.location.href = '/'; // Redirecionar para a rota raiz
    } else {
        alert('algo deu errado');
    }
})

document.addEventListener('DOMContentLoaded', function() {
    const id_usuario = localStorage.getItem('id_usuario');
    const token = localStorage.getItem('token');

    if (!id_usuario || !token) {
        alert('Usuário não autenticado');
        window.location.href = '/'; // Redirecionar para a rota raiz
    }


    const renderContent = document.getElementById('renderContent');

    renderContent.addEventListener('click', async (event) => {
        if (event.target.matches('#btnAvançarParaServicos')) {
            event.preventDefault();
            const especialidade = document.querySelector('input[name="especialidade"]:checked');
            especialidadeSelecionada = especialidade.value;
            if (especialidade) {
                listarServicos();
            } else {
                alert('Selecione uma especialidade');
            }
        }
        if (event.target.matches('#btnAvançarParaFuncionarios')) {
            event.preventDefault();
            const servico = document.querySelector('input[name="servico"]:checked');
            if (servico) {
                novoAgendamento.id_servico = servico.value;
                console.log('id_servico:', novoAgendamento.id_servico);
                listarFuncionarios();
            } else {
                alert('Selecione um servico');
            }
        }
        if (event.target.matches('#btnAvançarParaHorarios')) {
            event.preventDefault();
            const funcionario = document.querySelector('input[name="funcionario"]:checked');
            if (funcionario) {
                novoAgendamento.id_funcionario = funcionario.value;
                console.log('Agendamento:', novoAgendamento);
                console.log('id_funcionario:', novoAgendamento.id_funcionario);
                listarHorarios();
            } else {
                alert('Selecione um funcionario');
            }
        }
        if (event.target.matches('#btnAgendar')) {
            event.preventDefault();
            const horario = document.querySelector('input[name="horario"]:checked');
            if (horario) {
                novoAgendamento.id_horario = horario.value;
                novoAgendamento.status_agendamento = 'agendado';
                console.log('Agendamento:', novoAgendamento);
                console.log('id_horario:', novoAgendamento.id_horario);
                solicitarAgendamento();
            } else {
                alert('Selecione um horario');
            }
        }
        if (event.target.matches('#btnAvançarParaMeusAgendamentos')) {
            event.preventDefault();
            listarAgendamentos();
        }
        if (event.target.matches('#btnCancelarAgendamento')) {
            agendamentoDelete = event.target.getAttribute('data-id');
            console.log('agendamentoDelete:', agendamentoDelete);
            
            cancelarAgendamento();
        }
    });
});

async function cancelarAgendamento() {
    id_agendamento = agendamentoDelete;
    const data = {
      id_agendamento,
      id_usuario: localStorage.getItem('id_usuario'),
      id_usuario_logado: localStorage.getItem('id_usuario')
    }
    fetch('http://localhost:5500/agendamentos/excluir', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data) // Passa o objeto 'data' diretamente como corpo da requisição
      })
      .then(response => response.json())
      .catch(error => console.error('Erro ao obter os serviços:', error));
      alert('Agendamento cancelado com sucesso');
      window.location.reload();
      return;
  }

function solicitarAgendamento() {
    const id_usuario = novoAgendamento.id_usuario;
    const id_funcionario = novoAgendamento.id_funcionario;
    const id_servico = novoAgendamento.id_servico;
    const id_horario = novoAgendamento.id_horario;
    const status_agendamento = novoAgendamento.status_agendamento;
    fetch('http://localhost:5500/agendamentos/novo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ id_usuario, id_funcionario, id_servico, id_horario, status_agendamento })
    })
      .then(response => response.json())
      .then(response => {
        if(response != null){
            agendamento = response.agendamento
            const renderContent = document.getElementById('renderContent');
            renderContent.innerHTML = ''; // Clear previous content
            
            const mainContentHeader = document.getElementById("mainContentHeader");
            var heading = document.createElement("h1");
            heading.innerHTML = "Parabens!";
            mainContentHeader.innerHTML = "";
            mainContentHeader.appendChild(heading);
            
            const card = document.createElement('div');
            card.className = 'card-confirmacao';

            const h1 = document.createElement('h1');
            h1.innerText = 'Agendamento realizado com sucesso';

            card.appendChild(h1);
            renderContent.appendChild(card);

    
            const btn = document.createElement('button');
            btn.id = 'btnAvançarParaMeusAgendamentos';
            btn.innerText = 'Meus agendamentos';
    
            renderContent.appendChild(btn);
        }else{
            alert('Falha ao agendar, tente novamente');
        }
        
      })
      .catch(error => console.error('Erro ao obter os serviços:', error));
}


function listarHorarios() {
    const id_funcionario = novoAgendamento.id_funcionario;
    fetch('http://localhost:5500/funcionarios/listarHorariosDisponiveisPorId', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ id_funcionario })
    })
      .then(response => response.json())
      .then(response => {
        const horarios = response.horarios; // Access the array of services
  
        const renderContent = document.getElementById('renderContent');
        renderContent.innerHTML = ''; // Clear previous content
  
        const mainContentHeader = document.getElementById("mainContentHeader");
        var heading = document.createElement("h2");
        heading.innerHTML = "Selecione um<br> horario: ";
        mainContentHeader.innerHTML = "";
        mainContentHeader.appendChild(heading);

        horarios.forEach(horario => {
            const card = document.createElement('div');
            card.className = 'card-horario';

            const radioButton = document.createElement('input');
            radioButton.type = 'radio';
            radioButton.name = 'horario';
            radioButton.value = horario.id_horario;
            
            const label3 = document.createElement('label');
            label3.innerText = new Date(horario.inicio_horario).toLocaleDateString();
            const label = document.createElement('label');
            label.innerText = horario.dia_semana_horario.toUpperCase();
            const label2 = document.createElement('label');
            label2.innerText = new Date(horario.inicio_horario).toLocaleTimeString();

            const div = document.createElement('div');
            div.className = 'horario';
            div.appendChild(label3);
            div.appendChild(label2);
            card.appendChild(radioButton);
            card.appendChild(label);
            card.appendChild(div);

            renderContent.appendChild(card);
        });
  
        const btn = document.createElement('button');
        btn.id = 'btnAgendar';
        btn.innerText = 'Agendar';
  
        renderContent.appendChild(btn);
      })
      .catch(error => console.error('Erro ao obter os serviços:', error));
  }

function listarFuncionarios() {
    const id_especialidade = especialidadeSelecionada;
    fetch('http://localhost:5500/funcionarios/listarFuncionariosPorEspecialidade', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ id_especialidade })
    })
      .then(response => response.json())
      .then(response => {
        const funcionarios = response.funcionarios; // Access the array of services
  
        const renderContent = document.getElementById('renderContent');
        renderContent.innerHTML = ''; // Clear previous content
  
        const mainContentHeader = document.getElementById("mainContentHeader");
        var heading = document.createElement("h2");
        heading.innerHTML = "Selecione um<br> funcionario: ";
        mainContentHeader.innerHTML = "";
        mainContentHeader.appendChild(heading);

        funcionarios.forEach(funcionario => {
          const card = document.createElement('div');
          card.className = 'card-funcionario';
  
          const radioButton = document.createElement('input');
          radioButton.type = 'radio';
          radioButton.name = 'funcionario';
          radioButton.value = funcionario.id_funcionario;
  
          const label = document.createElement('label');
          label.innerText = funcionario.apelido_funcionario;
  
          card.appendChild(radioButton);
          card.appendChild(label);
  
          renderContent.appendChild(card);
        });
  
        const btn = document.createElement('button');
        btn.id = 'btnAvançarParaHorarios';
        btn.innerText = 'Avançar';
  
        renderContent.appendChild(btn);
      })
      .catch(error => console.error('Erro ao obter os serviços:', error));
  }


function listarServicos() {
    const id_especialidade = especialidadeSelecionada;
    fetch('http://localhost:5500/especialidades/listarServicosPorEspecialidade', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ id_especialidade })
    })
      .then(response => response.json())
      .then(response => {
        const servicos = response.servicos; // Access the array of services
  
        const renderContent = document.getElementById('renderContent');
        renderContent.innerHTML = ''; // Clear previous content
  
        const mainContentHeader = document.getElementById("mainContentHeader");
        var heading = document.createElement("h2");
        heading.innerHTML = "Selecione um<br> serviço: ";
        mainContentHeader.innerHTML = "";
        mainContentHeader.appendChild(heading);

        servicos.forEach(servico => {
          const card = document.createElement('div');
          card.className = 'card-servico';
  
          const radioButton = document.createElement('input');
          radioButton.type = 'radio';
          radioButton.name = 'servico';
          radioButton.value = servico.id_servico;
  
          const label = document.createElement('label');
          label.innerText = servico.nome_servico;
  
          card.appendChild(radioButton);
          card.appendChild(label);
  
          renderContent.appendChild(card);
        });
  
        const btn = document.createElement('button');
        btn.id = 'btnAvançarParaFuncionarios';
        btn.innerText = 'Avançar';
  
        renderContent.appendChild(btn);
      })
      .catch(error => console.error('Erro ao solicitar agendamento:', error));
  }


function listarEspecialidades() {
    fetch('http://localhost:5500/especialidades/listar', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: 'include'
    })
    .then(response => response.json())
    .then(response => {
    const especialidades = response.especialidades; // Acesso ao array de especialidades

    const renderContent = document.getElementById('renderContent');
    renderContent.innerHTML = ''; // Limpa o conteúdo anterior
    
    const mainContentHeader = document.getElementById("mainContentHeader");
    var heading = document.createElement("h2");
    heading.innerHTML = "Selecione uma<br> especialidade: ";
    mainContentHeader.innerHTML = "";
    mainContentHeader.appendChild(heading);

    especialidades.forEach(especialidade => {
        const card = document.createElement('div');
        card.className = 'card-especialidade';
        const radioButton = document.createElement('input');
        radioButton.type = 'radio';
        radioButton.name = 'especialidade';
        radioButton.value = especialidade.id_especialidade;

        const label = document.createElement('label');
        label.innerText = especialidade.nome_especialidade;
        
        card.appendChild(radioButton);
        card.appendChild(label);

        renderContent.appendChild(card);
    });

    const btn = document.createElement('button');
    btn.id = 'btnAvançarParaServicos';
    btn.innerText = 'Avançar';

    renderContent.appendChild(btn);
    })
    .catch(error => console.error('Erro ao obter as especialidades:', error));
}

function listarAgendamentos() {
    var renderDiv = document.getElementById("renderContent");
    renderDiv.innerHTML = ""; // Limpa o conteúdo da div antes de adicionar os agendamentos
    const id_usuario = localStorage.getItem('id_usuario');

    fetch('http://localhost:5500/agendamentos/getAgendamentoPorCliente', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ id_usuario }) // Inclui o id_usuario no corpo da requisição
    })
    .then(response => response.json())
    .then(agendamentos => {
      if (Array.isArray(agendamentos.agendamento) && agendamentos.agendamento.length > 0) {
        const mainContentHeader = document.getElementById("mainContentHeader");
        var heading = document.createElement("h2");
        heading.innerHTML = "Seus <br> Agendamentos: ";
        mainContentHeader.innerHTML = "";
        mainContentHeader.appendChild(heading);
        agendamentos.agendamento.forEach(function(agendamento) {
          let data = new Date(agendamento.inicio_horario).toLocaleDateString();
          let horaCompleta = new Date(agendamento.inicio_horario).toLocaleTimeString();
          let hora = horaCompleta.split(':').slice(0, 2).join(':');
          let apelido = agendamento.apelido_funcionario.toUpperCase();
          let dia_semana = agendamento.dia_semana_horario.toUpperCase();
          let servico = agendamento.nome_servico.toUpperCase();
          console.log(data, hora, apelido, dia_semana, servico);
          
          var card = document.createElement("div");
          card.className = "card-agendamento";
          card.innerHTML = `
            <div>
                <strong>
                    <p>${dia_semana}</p>
                    <p>${hora}</p>
                </strong>
                <p>${data}</p>
            </div>
            <div>
                <p>Servico:<br> ${servico}</p>
                <p>Profissional:<br> ${apelido}</p>
            </div>
            <button id="btnCancelarAgendamento" data-id="${agendamento.id_agendamento}"><strong>Cancelar</strong></button>
          `;
          renderDiv.appendChild(card);
        });
      } else {
        alert('Você ainda não tem agendamentos');
        window.location.reload();
      }

    })
    .catch(error => {
      console.log('Erro de solicitação:', error);
    });
  }