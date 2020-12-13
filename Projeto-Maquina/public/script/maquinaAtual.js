maquina_atual_no_site();
function maquina_atual_no_site() {
                var usuario_maquina;
                var idUsuario = sessionStorage.idUsuario_usuario_meuapp;
                var fkSupervisor = sessionStorage.fkSupervisor_usuario_meuapp;
                if(fkSupervisor=='null'){
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
                    var select = document.getElementById("maquina_atual");
                    select.add(option);


                }
                plotar_tudo();
            })
        } else {
            console.error('Nenhum dado encontrado ou erro na leituras');
        }
    }).catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

}