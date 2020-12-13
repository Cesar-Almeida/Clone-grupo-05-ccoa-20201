atualizar_Maquinas();
function atualizar_Maquinas() {
    var usuario_maquina;
    var idUsuario = sessionStorage.idUsuario_usuario_meuapp;
    var fkSupervisor = sessionStorage.fkSupervisor_usuario_meuapp;
    if(fkSupervisor=="null"){
        usuario_maquina=idUsuario
    }else{
        usuario_maquina=fkSupervisor
    }

fetch(`http://localhost:3000/leituras/recebermaquinas/${usuario_maquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {

            response.json().then(function (resposta) {

           

                for (i = 0; i < resposta.length; i++) {


                    var registro = resposta[i];
                    const tipodaMaquina = registro.tipoMaquina;
                    const iddaMaquina = registro.idMaquina;
                    const concatenar = `ID: ${iddaMaquina} - Tipo Máquina: ${tipodaMaquina}`
                    var option = new Option(concatenar, iddaMaquina);
                    var select = document.getElementById("maquina_valor");
                    select.add(option);


                }
            })
        } else {
            console.error('Nenhum dado encontrado ou erro na leituras');
        }
    }).catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

}
///////////////////////////
atualizar_Componentes();
function atualizar_Componentes() {

    fetch('http://localhost:3000/leituras/recebercomponentes', { cache: 'no-store' }).then(function (response) {
        if (response.ok) {

            response.json().then(function (resposta) {

            

                for (i = 0; i < resposta.length; i++) {


                    var registro = resposta[i];
                    const nomeComponente = registro.nomeComponente;
                    const idComponente = registro.idComponente;

                    var option = new Option(nomeComponente, idComponente);
                    var select = document.getElementById("componente_valor");
                    select.add(option);



                }
            })
        } else {
            console.error('Nenhum dado encontrado ou erro na leituras');
        }
    }).catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

}

function atualizar_banco(maquina, componente, ativado,minimo,maximo) {
    maquina = parseInt(maquina)
    componente = parseInt(componente)
    ativado = parseInt(ativado)
    minimo = parseFloat(minimo)
    maximo = parseFloat(maximo)
 
    fetch(`http://localhost:3000/leituras/enviar/${maquina}/${componente}/${ativado}/${minimo}/${maximo}`, { method: "POST" }, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

               


                var linhasalteradas = resposta.affectedRows;
                if (linhasalteradas == 0) {
                    fetch(`http://localhost:3000/leituras/criar/${maquina}/${componente}/${ativado}/${minimo}/${maximo}`, { method: "POST" }, { cache: 'no-store' }).then(function (response) {
                        if (response.ok) {
                            console.log("Alterado com sucesso")
                        } else {
                            console.error('Nenhum dado encontrado ou erro na leituras');
                        }
                        return false;
                    });

                }

            })

            console.log("Alterado com sucesso")
        } else {
            console.error('Nenhum dado encontrado ou erro na leituras');
        }
        return false;
    });
    receber_ativados(maquina, componente)
}

function receber_ativados(maquina, componente) {
    maquina = parseInt(maquina)
    componente = parseInt(componente)


    fetch(`http://localhost:3000/leituras/receber/${maquina}/${componente}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {

            response.json().then(function (resposta) {

                if (resposta.length == 1) {
                    for (i = 0; i < resposta.length; i++) {


                        var registro2 = resposta[i];
                        const nivel_ativado = registro2.ativado.data;
                        const minimo_atual = registro2.minimo;
                        const maximo_atual = registro2.maximo;
                        const metrica_atual = registro2.metrica;
                        if (nivel_ativado == 1) {
                            ativado_atualmente.innerHTML = 'Ativado'
                            ativado_atualmente.style.color = 'green'
                        } else {
                            ativado_atualmente.innerHTML = 'Desativado'
                            ativado_atualmente.style.color = 'Red'
                        }

                        digitar_minimo.value = minimo_atual;
                        digitar_maximo.value = maximo_atual;
                        atual_minimo.innerHTML = minimo_atual + metrica_atual
                        atual_maximo.innerHTML = maximo_atual + metrica_atual

                    }
                } else {

                    ativado_atualmente.innerHTML = 'Não existe'
                    ativado_atualmente.style.color = 'Blue'
                    digitar_minimo.value = 0;
                    digitar_maximo.value = 100;
                    atual_minimo.innerHTML = 'Não existe'
                    atual_maximo.innerHTML = 'Não existe'
                }

            })
        } else {
            console.error('Nenhum dado encontrado ou erro na leituras');
        }
        return false;
    });
}
function comparar_parametros() {
    if (parseFloat(digitar_minimo.value) >= parseFloat(digitar_maximo.value)) {
        alert('Valor minimo maior que o máximo')
        digitar_maximo.value = `${parseFloat(digitar_minimo.value) + 1}`
    }

}
var esconder = 0;
function desesconder() {
    if (esconder == 0) {
        div_edicao_parametro.style.display = 'block'
        botao_editar_parametros.innerHTML = 'Parar edição'
        esconder++
    } else {
        esconder = 0
        div_edicao_parametro.style.display = 'none'
        botao_editar_parametros.innerHTML = 'Editar Parametros'
    }

}