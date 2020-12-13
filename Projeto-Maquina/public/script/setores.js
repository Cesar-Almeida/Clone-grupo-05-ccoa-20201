
window.onload = atualizarGrafico();
function atualizarGrafico() {

    fetch('/leituras/estatisticas', { cache: 'no-store' }).then(function (response) {
        if (response.ok) {

            response.json().then(function (resposta) {

                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

            

                    const contexto = document.getElementById(`grafico`).getContext('2d');

                    var registro = resposta;
                    var largura = registro.length
                    var dado=[]
                    var dado2=[]
                    var maiorTemperatura=[]
                    var menorTemperatura=[]
                    var maiorUmidade=[]
                    var menorUmidade=[]
                    //essas variaveis aqui com []
                for(i=0;i<largura;i++){
                    dado.push(registro[i].temp)
                   
                    if(i==0){
                        maiorTemperatura.push(registro[i].temp)
                        maiorTemperatura.push(i+1)
                    }else if(maiorTemperatura[0] < registro[i].temp){
                        maiorTemperatura[0]=registro[i].temp;
                        maiorTemperatura[1]=i+1
                    }

                    if(i==0){
                        menorTemperatura.push(registro[i].temp)
                        menorTemperatura.push(i+1)
                    }else if(menorTemperatura[0] > registro[i].temp){
                        menorTemperatura[0]=registro[i].temp;
                        menorTemperatura[1]=i+1
                    }

                    



                }
                
                for(i=0;i<largura;i++){
                    dado2.push(registro[i].umidade)

                    if(i==0){
                        maiorUmidade.push(registro[i].umidade)
                        maiorUmidade.push(i+1)
                    }else if(maiorUmidade[0] < registro[i].umidade){
                        maiorUmidade[0]=registro[i].umidade;
                        maiorUmidade[1]=i+1
                    }

                    if(i==0){
                        menorUmidade.push(registro[i].umidade)
                        menorUmidade.push(i+1)
                    }else if(menorUmidade[0] > registro[i].umidade){
                        menorUmidade[0]=registro[i].umidade;
                        menorUmidade[1]=i+1
                    }



                }
                    AtualizarIndices(maiorTemperatura,menorTemperatura,maiorUmidade,menorUmidade);
                    plotarGrafico(contexto, dado, dado2);
                  
            })
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    }).catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

    setTimeout(() => {
        atualizarGrafico();

    }, 5000);
}
/*SOLO */
window.onload = atualizarGraficosolo();
function atualizarGraficosolo() {

    fetch('/leituras/estatisticas2', { cache: 'no-store' }).then(function (response) {
        if (response.ok) {

            response.json().then(function (resposta) {

                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

            

                    const contexto = document.getElementById(`graficosolo`).getContext('2d');

					var registro = resposta;
                    var largura = registro.length
                    var dado=[]
                    var dado2=[]
                    var maiorTemperatura=[]
                    var menorTemperatura=[]
                    var maiorUmidade=[]
                    var menorUmidade=[]
                for(i=0;i<largura;i++){
                    dado.push(registro[i].temp)

                    if(i==0){
                        maiorTemperatura.push(registro[i].temp)
                        maiorTemperatura.push(i+1)
                    }else if(maiorTemperatura[0] < registro[i].temp){
                        maiorTemperatura[0]=registro[i].temp;
                        maiorTemperatura[1]=i+1
                    }

                    if(i==0){
                        menorTemperatura.push(registro[i].temp)
                        menorTemperatura.push(i+1)
                    }else if(menorTemperatura[0] > registro[i].temp){
                        menorTemperatura[0]=registro[i].temp;
                        menorTemperatura[1]=i+1
                    }

                    



                }
                
                for(i=0;i<largura;i++){
                    dado2.push(registro[i].umidade)

                    if(i==0){
                        maiorUmidade.push(registro[i].umidade)
                        maiorUmidade.push(i+1)
                    }else if(maiorUmidade[0] < registro[i].umidade){
                        maiorUmidade[0]=registro[i].umidade;
                        maiorUmidade[1]=i+1
                    }

                    if(i==0){
                        menorUmidade.push(registro[i].umidade)
                        menorUmidade.push(i+1)
                    }else if(menorUmidade[0] > registro[i].umidade){
                        menorUmidade[0]=registro[i].umidade;
                        menorUmidade[1]=i+1
                    }



                }
                    AtualizarIndicesSolo(maiorTemperatura,menorTemperatura,maiorUmidade,menorUmidade);
                    plotarGrafico2(contexto, dado, dado2);
                 
            })
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    }).catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

    setTimeout(() => {
        atualizarGraficosolo();

    }, 5000);
   
}



