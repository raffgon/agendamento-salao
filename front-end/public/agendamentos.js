btnMeusAgendamentos = document.getElementById('btnMeusAgendamentos');

btnMeusAgendamentos.addEventListener('click', async (event) => {
    event.preventDefault();
    listarAgendamentos();
});

const btnAgendar = document.getElementById('btnAgendar');
btnAgendar.addEventListener('click', async (event) => {
    event.preventDefault();
    listarEspecialidades();
});

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
  
      especialidades.forEach(especialidade => {
        const radioButton = document.createElement('input');
        radioButton.type = 'radio';
        radioButton.name = 'especialidade';
        radioButton.value = especialidade.id_especialidade;
  
        const label = document.createElement('label');
        label.innerText = especialidade.nome_especialidade;
  
        renderContent.appendChild(radioButton);
        renderContent.appendChild(label);
        renderContent.appendChild(document.createElement('br'));
      });
    })
    .catch(error => console.error('Erro ao obter as especialidades:', error));
  }

function listarAgendamentos() {
    var renderDiv = document.getElementById("renderContent");
    renderDiv.innerHTML = ""; // Limpa o conteúdo da div antes de adicionar os agendamentos
  
    fetch('http://localhost:5500/agendamentos/getAgendamentoPorCliente', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': document.cookie.id_usuario
      },
      credentials: 'include'
    })
    .then(response => response.json())
    .then(agendamentos => {
    if (Array.isArray(agendamentos.agendamento) && agendamentos.agendamento.length > 0) {
        agendamentos.agendamento.forEach(function(agendamento) {
        var card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <p><strong>Nome do usuário:</strong> ${agendamento.nome_usuario}</p>
            <p><strong>Apelido do funcionário:</strong> ${agendamento.apelido_funcionario}</p>
            <p><strong>Nome do serviço:</strong> ${agendamento.nome_servico}</p>
            <p><strong>Início do horário:</strong> ${agendamento.inicio_horario}</p>
            <p><strong>Fim do horário:</strong> ${agendamento.fim_horario}</p>
            <p><strong>Dia da semana:</strong> ${agendamento.dia_semana_horario}</p>
        `;

        renderDiv.appendChild(card);
        });
    } else {
        alert('Você ainda não tem agendamentos');
    }
    })
    .catch(error => {
      console.log('Erro de solicitação:', error);
    });
  }