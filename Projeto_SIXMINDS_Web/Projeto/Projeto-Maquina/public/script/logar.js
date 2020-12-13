function entrar() {
    var formulario = new URLSearchParams(new FormData(form_login));
    fetch("/usuarios/autenticar", {]
        method: "POST",
        body: formulario
    }).then(resposta => {
        console.log('Entrou')
        if (resposta.ok) {

            resposta.json().then(json => {
                // Modificar
                sessionStorage.login_usuario_meuapp = json.Email;
                sessionStorage.senha_usuario_meuapp = json.Senha;
                
                window.location.href = 'dashboard.html';
            });

        } else {

            console.log('Erro de login!');

            response.text().then(texto => {
                console.error(texto);
            });
        }
    });

    return false;
}
