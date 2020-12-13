  atualizarGraficoGrande();
  // //-----------------------------------------MYCHART ---------------------------------------
  var teste10 = 0;
  function plotarGraficoGrande(contexto, dadoMesTemp, dadoMesUmid) {
    if (teste10 >= 1) {
      chart.destroy();
      teste10 = 0;
    }
    var chart = new Chart(contexto, {
      type: 'line',
      data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        datasets: [{
          label: 'Temperatura',
          backgroundColor: 'green',
          borderColor: 'green',
          data: dadoMesTemp,
          fill: false
        },
        {
          label: 'Umidade',
          backgroundColor: 'yellow',
          borderColor: 'yellow',
          data: dadoMesUmid,
          fill: false
        }],
      },

      options: {}
    });
    teste10++;
  }

window.onload = atualizarGraficoGrande();
function atualizarGraficoGrande() {
    fetch('/leituras/graficosao1', { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                const contexto = document.getElementById(`myChart`).getContext('2d');
                var registro = resposta;
                var dadoMesTemp = [];
                var dadoMesUmid = [];
                for (let mes = 0; mes < 12; mes++) {
                    dadoMesTemp.push(registro[mes].med_temp);
                }
                for (let mes = 0; mes < 12; mes++) {
                    dadoMesUmid.push(registro[mes].med_umid);
                }
                console.log(dadoMesTemp);
                console.log(dadoMesUmid);

                plotarGraficoGrande(contexto, dadoMesTemp, dadoMesUmid);
            })
        }
        else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    }).catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

    setTimeout(() => {
        atualizarGraficoGrande();

    }, 5000);
}
// maiorTemperatura.push(registro[i].temp)

// console.log(critico);
// console.log(alerta);
// console.log(ideal);
// console.log(emergencial);
// var largura = registro.length;
// for(let x=0;x<largura;x++){
//     let sens=registro[x].temp
//     if(sens<=19){
//         critico+=critico+1;
//     }
//     else if(sens<=20){
//         emergencial=emergencial+1;
//     }





// function atualizarGraficoGrande() {

//     fetch('/leituras/graficosao1', { cache: 'no-store' }).then(function (response) {
//         if (response.ok) {

//             response.json().then(function (resposta) {

//                 console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

//                     const contexto = document.getElementById(`rosquinha`).getContext('2d');


//             })
//         }
//         else {
//             console.error('Nenhum dado encontrado ou erro na API');
//         }
//     }).catch(function (error) {
//         console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
//     });

//     setTimeout(() => {
//         atualizarRosca();

//     }, 5000);
// }