const btnLogin = document.getElementById('btnLogin');

btnLogin.addEventListener('submit', async (event) => {
    event.preventDefault();

    const emailUsuario = document.getElementById('email').value;
    const senhaUsuario = document.getElementById('senha').value;

    const data = {
    email_usuario: emailUsuario,
    senha_usuario: senhaUsuario
    };

    console.log(data)

    fetch('http://localhost:5500/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        // Lidar com a resposta da API
        console.log(result);
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});