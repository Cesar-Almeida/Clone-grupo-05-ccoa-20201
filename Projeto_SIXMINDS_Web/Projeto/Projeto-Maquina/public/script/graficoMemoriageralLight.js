
  var componente_memoria_atualmente=NaN;
  var myChart_memoria_geral 
  var myChart_memoria 
var conjunto_2_dataset_memoria_geral=[]
function atualizar_conjunto_memoria( leituraUsoPorcGeral,metrica,cores){
conjunto_2_dataset_memoria_geral=[
      {
        label: `${metrica} de utilização memória`,
        data: leituraUsoPorcGeral,
        fill: true,
        backgroundColor: cores,
        borderColor:  "rgba(6, 20, 2, 0.69)",
        borderWidth: 1,
      },
    ]
}
  function plotarMemoriaGeral(tempoLeituraGeral, leituraUsoPorcGeral,vez,metrica,cores) {
    if(vez==0){
    atualizar_conjunto_memoria( leituraUsoPorcGeral,metrica,cores)
    }else{
      atualizar_conjunto_memoria( leituraUsoPorcGeral,metrica,cores)
    var ctx = document.getElementById("memory_geral_chart").getContext("2d");
    
  myChart_memoria_geral = new Chart(ctx, {
      type: "line",
      data: {
        labels: tempoLeituraGeral,
        datasets: conjunto_2_dataset_memoria_geral,
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  myChart_memoria = new Chart(document.getElementById("memory_chart").getContext("2d"), {
      type: "line",
      data: {
        labels: tempoLeituraGeral,
        datasets: conjunto_2_dataset_memoria_geral,
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }
}

  function atualizarMemoriaGeral(vez) {
    fetch(`http://localhost:3000/leituras/dadosMemoriaUsoPerc/${maquina_atual.value}/6`, { cache: "no-store" })
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (resposta) {
   
            let registro = resposta;
            if(registro!=undefined && registro[0]!=undefined && registro[0].ativado.data[0]==1  && registro.length!=0){
              Mem_AVISO.innerHTML ='';
              memory_chart.style.display='block'
              AVISO_geral_memoria.innerHTML='';
            memory_geral_chart.style.display='block'
            let leituraUsoPorcGeral = [];
            let tempoLeituraGeral = [];
              let cores;
            for (n = registro.length - 1; n >= 0; n--) {
              leituraUsoPorcGeral.push(registro[n].valor);
              tempoLeituraGeral.push(registro[n].hora);
              if (parseFloat(registro[n].valor) > parseFloat(registro[n].maximo)) {
                cores='rgba(255, 99, 132, 0.30)'
              } else if (parseFloat(registro[n].valor) < parseFloat(registro[n].minimo)) {
                cores='rgba(255, 205, 56, 0.30)'
              } else {
                cores='rgba(69, 210, 232, 0.30)'
              }
              parametro_minimo_MEMORIA.innerHTML = `${registro[0].minimo} ${registro[0].metrica}`
              parametro_maximo_MEMORIA.innerHTML = `${registro[0].maximo} ${registro[0].metrica}`
            }

            
            plotarMemoriaGeral(tempoLeituraGeral, leituraUsoPorcGeral,vez,registro[0].metrica,cores);
          }else{
            Mem_AVISO.innerHTML ='Componente Desativado ou sem leituras, comunique com seu gerente para mais detalhes';
            memory_chart.style.display='none'
            AVISO_geral_memoria.innerHTML='Componente Desativado ou sem leituras, comunique com seu gerente para mais detalhes';
            memory_geral_chart.style.display='none'
          }
          });
        } else {
          console.error("Nenhum dado encontrado ou erro na leituras");
        }
      })
      .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });
    
    setInterval(() => {
   //   atualizarMemoriaGeral();
   //eliminar_memoria()
    }, 5000);
  }
  function eliminar_memoria(){
   
    myChart_memoria_geral.data.labels.shift();
    myChart_memoria_geral.data.datasets.forEach(dataset => {
      dataset.data.shift();
 
    });
    myChart_memoria_geral.data.labels.push(tempoLeitura[tempoLeitura.length - 1])
    myChart_memoria_geral.data.datasets.forEach((dataset, n) => {
        dataset.data.push(conjunto_2_dataset_memoria_geral[n].data[conjunto_2_dataset_memoria_geral[n].data.length - 1])
     
      });
      myChart_memoria.update();
    myChart_memoria_geral.update();
   }