const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const btnLogin = document.getElementById('btnLogin');

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
            const cookie = responseData.token;
            document.cookie = `token=${cookie}; path=/`;
            console.log('Cookie:', document.cookie);
            window.location.href = '/login';
        } else {
            // A resposta não foi bem-sucedida
            const errorData = await response.json();
            console.log('Erro ao fazer login:', errorData.mensagem);
        }
    } catch (error) {
        console.log('Erro de solicitação:', error);
    }
});