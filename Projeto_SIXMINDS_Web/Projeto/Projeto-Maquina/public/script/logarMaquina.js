function entrar() {
    var login = req.body.login;
    var senha = req.body.senha;

    console.log(login);
    console.log(senha);
fetch(`http://localhost:3000/leituras/autenticar`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            console.log(senha+login);
            response.json().then(function (resposta) {
                // if(usuario == "gerente"){
                //     window.location.href = 'dashGerente.html';
                // }else if(usuario == "analista"){
                //     window.location.href = 'dashMaquina.html';
                // }else if(usuario == "lite"){
                //     window.location.href = 'dashMaquina2.html';
                // }
            })
          } else {
            console.error('Nenhum dado encontrado ou erro na leituras');
          }
        }).catch(function (error) {
          console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
      
}

