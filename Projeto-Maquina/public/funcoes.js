let cidade_usuario;
let estado_usuario;
let cpf_usuario;
let rg_usuario;
let cep_usuario;
let senha_usuario;
function redirecionar_login() {
    window.location.href = 'login.html';
}

function verificar_autenticacao() {
    login_usuario = sessionStorage.login_usuario_meuapp;
    nome_usuario = sessionStorage.nome_usuario_meuapp;



    if (login_usuario == undefined)  {
        redirecionar_login();
    } else {
        NomeCompleto.innerHTML = nome_usuario;
        NomeCompleto.value = nome_usuario;
        validar_sessao();
    }
    cpf_usuario = sessionStorage.cpf_usuario_meuapp;
    rg_usuario = sessionStorage.rg_usuario_meuapp
    cep_usuario = sessionStorage.cep_usuario_meuapp;
    cidade_usuario = sessionStorage.cidade_usuario_meuapp;
    estado_usuario = sessionStorage.estado_usuario_meuapp;
    senha_usuario = sessionStorage.senha_usuario_meuapp;
    // Ids
    LG.value =  login_usuario;
    CPF.value =  cpf_usuario;
    RG.value =  rg_usuario;
    CD.value =  cidade_usuario;
    UF.value =  estado_usuario;
    SE.value =  senha_usuario;
    CEP.value =  cep_usuario;
    
}

function logoff() {
    finalizar_sessao();
    sessionStorage.clear();
    redirecionar_login();
}

function validar_sessao() {
    fetch(`/usuarios/sessao/${login_usuario}`, {cache:'no-store'})
    .then(resposta => {
        if (resposta.ok) {
            resposta.text().then(texto => {
                console.log('Sessão :) ', texto);    
            });
        } else {
            console.error('Sessão :.( ');
            logoff();
        } 
    });    
}

function finalizar_sessao() {
    fetch(`/usuarios/sair/${login_usuario}`, {cache:'no-store'}); 
}