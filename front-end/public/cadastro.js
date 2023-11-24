const cadastroForm = document.getElementById('cadastroForm');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const btnLogin = document.getElementById('btnCadastrar');

document.addEventListener('DOMContentLoaded', function() {
    const id_usuario = localStorage.getItem('id_usuario');
    const token = localStorage.getItem('token');
  
    if (id_usuario && token) {
      alert('Usuário ja esta logado');
      window.location.href = '/home'; // Redirecionar para a rota raiz
    }
  });

cadastroForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nomeUsuario = nomeInput.value;
    const emailUsuario = emailInput.value;
    const senhaUsuario = senhaInput.value;

    const data = {
        nome_usuario: nomeUsuario,
        email_usuario: emailUsuario,
        senha_usuario: senhaUsuario
    };
    console.log('data: ', data);
    try {
        const response = await fetch('http://localhost:5500/cadastro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
        });
        if (response.ok) {
            alert('Conta criada com sucesso!');
            window.location.href = '/login';
        } else {
            alert('Email ja cadastrado');
            const errorData = await response.json();
            console.log('Erro ao criar conta:', errorData.mensagem);
        }
    } catch (error) {
        console.log('Erro de solicitação:', error);
    }
});