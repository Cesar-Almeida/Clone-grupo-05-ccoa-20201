
atualizar_ComponentesCPU()
function atualizar_ComponentesCPU() {

    fetch('http://localhost:3000/leituras/recebercomponentesCPU', { cache: 'no-store' }).then(function (response) {
        if (response.ok) {

            response.json().then(function (resposta) {

            

                for (i = 0; i < resposta.length; i++) {


                    var registro = resposta[i];
                    const nomeComponente = registro.nomeComponente;
                    const idComponente = registro.idComponente;

                    var option = new Option(nomeComponente, idComponente);
                    var select = document.getElementById("componenteCPU_valor");
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
atualizar_ComponentesMem()
function atualizar_ComponentesMem() {

    fetch('http://localhost:3000/leituras/recebercomponentesMem', { cache: 'no-store' }).then(function (response) {
        if (response.ok) {

            response.json().then(function (resposta) {

            

                for (i = 0; i < resposta.length; i++) {


                    var registro = resposta[i];
                    const nomeComponente = registro.nomeComponente;
                    const idComponente = registro.idComponente;

                    var option = new Option(nomeComponente, idComponente);
                    var select = document.getElementById("componenteMem_valor");
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
atualizar_ComponentesDisco()
function atualizar_ComponentesDisco() {

    fetch('http://localhost:3000/leituras/recebercomponentesDisco', { cache: 'no-store' }).then(function (response) {
        if (response.ok) {

            response.json().then(function (resposta) {

            

                for (i = 0; i < resposta.length; i++) {


                    var registro = resposta[i];
                    const nomeComponente = registro.nomeComponente;
                    const idComponente = registro.idComponente;

                    var option = new Option(nomeComponente, idComponente);
                    var select = document.getElementById("componenteDisco_valor");
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
