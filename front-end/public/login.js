const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const btnLogin = document.getElementById('btnLogin');

document.addEventListener('DOMContentLoaded', function() {
    const id_usuario = localStorage.getItem('id_usuario');
    const token = localStorage.getItem('token');

    if (id_usuario && token) {
        alert('Usuario ja autenticado');
        window.location.href = '/home';
    }
});

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const emailUsuario = emailInput.value;
    const senhaUsuario = senhaInput.value;

    const data = {
        email_usuario: emailUsuario,
        senha_usuario: senhaUsuario
    };
    console.log('data: ', data);
    try {
        const response = await fetch('http://localhost:5500/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
        });
        if (response.ok) {
            const responseData = await response.json();
            console.log('responseData:', responseData);
            const id_usuario = responseData.id_usuario;
            const token = responseData.token;
            localStorage.setItem('id_usuario', id_usuario);
            localStorage.setItem('token', token);
            console.log('token:', localStorage.getItem('token'));
            console.log('id_usuario:', localStorage.getItem('id_usuario'));
            alert('Login bem-sucedido!');
            window.location.href = '/home';
        } else {
            // A resposta não foi bem-sucedida
            const errorData = await response.json();
            console.log('Erro ao fazer login:', errorData.mensagem);
        }
    } catch (error) {
        console.log('Erro de solicitação:', error);
    }
});

