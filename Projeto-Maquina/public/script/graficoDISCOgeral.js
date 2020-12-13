
    var myChart_disk_geral;
    let leituraUsoPorc_disco_geral = [];
    var conjunto_2_dataset_disco_geral=[];
    var myChart_disk;
    function atualizar_conjunto_disco( leituraTemperatura, leituraUsoPorc,metrica,cores){
      conjunto_2_dataset_disco_geral=[
   

        {
          label: `Disco (${metrica})`,
          data: leituraTemperatura  ,
          fill: true,
          backgroundColor:cores,
          borderColor: "rgba(6, 20, 2, 0.69)",
          borderWidth: 1,
        },
      ];

    }
    function plotarDisco(tempoLeitura, leituraTemperatura, leituraUsoPorc,vez,metrica,cores) {
      
      if(vez==0){
        atualizar_conjunto_disco( leituraTemperatura, leituraUsoPorc,metrica,cores)
      }else{
        atualizar_conjunto_disco( leituraTemperatura, leituraUsoPorc,metrica,cores)
      var ctx = document.getElementById("disk_geral_chart").getContext("2d");
       myChart_disk_geral = new Chart(ctx, {
        type: "line",
        data: {
          labels: tempoLeitura,
          datasets: conjunto_2_dataset_disco_geral,
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
       myChart_disk = new Chart(document.getElementById("disk_chart").getContext("2d"), {
        type: "line",
        data: {
          labels: tempoLeitura,
          datasets: conjunto_2_dataset_disco_geral,
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
    function discoPorcentagem_geral() {
      fetch(`http://localhost:3000/leituras/dadosDiscoPerc/${maquina_atual.value}`, { cache: "no-store" })
        .then(function (response) {
          if (response.ok) {
            response.json().then(function (resposta) {
              
              let registro = resposta;
        
              leituraUsoPorc_disco_geral = [];
    
              for (n = registro.length - 1; n >= 0; n--) {
                leituraUsoPorc_disco_geral.push(registro[n].valorDiscoUsoPorc);
              }
            
            });
          } else {
            console.error("Nenhum dado encontrado ou erro na leituras");
          }
        })
        .catch(function (error) {
          console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
    }
    
    let leituraTemperatura = [];
    function atualizarDisco_geral(vez) {
      fetch(`http://localhost:3000/leituras/dadosDiscoTemp/${maquina_atual.value}/${componenteDisco_valor.value}`, { cache: "no-store" })
        .then(function (response) {
          if (response.ok) {
            response.json().then(function (resposta) {
            
              let registro = resposta;
              if(registro!=undefined && registro[0]!=undefined &&  registro[0].ativado.data[0]==1 &&  registro.length!=0){
              
              Disco_AVISO.innerHTML ='';
              disk_chart.style.display='block'
              AVISO_geral_disco.innerHTML='';
              disk_geral_chart.style.display='block'
              leituraTemperatura = [];
              let tempoLeitura = [];
                let cores;
              for (n = registro.length - 1; n >= 0; n--) {
                leituraTemperatura.push(registro[n].valorDiscoTemp);
                tempoLeitura.push(registro[n].hora);

                if (parseFloat(registro[n].valorDiscoTemp) > parseFloat(registro[n].maximo)) {
                  cores='rgba(255, 99, 132, 0.30)'
                } else if (parseFloat(registro[n].valorDiscoTemp) < parseFloat(registro[n].minimo)) {
                  cores='rgba(255, 205, 56, 0.30)'
                } else {
                  cores='rgba(69, 210, 232, 0.30)'
                }
              parametro_minimo_DISCO.innerHTML = `${registro[0].minimo} ${registro[0].metrica}`
              parametro_maximo_DISCO.innerHTML = `${registro[0].maximo} ${registro[0].metrica}`
              }

              discoPorcentagem_geral();
    
              plotarDisco(tempoLeitura, leituraTemperatura, leituraUsoPorc_disco_geral,vez,registro[0].metrica,cores);
            }else{
              Disco_AVISO.innerHTML ='Componente Desativado ou sem leituras, comunique com seu gerente para mais detalhes';
              disk_chart.style.display='none'
              AVISO_geral_disco.innerHTML='Componente Desativado ou sem leituras, comunique com seu gerente para mais detalhes';
              disk_geral_chart.style.display='none'
            }
            });
            
          } else {
            //console.error("Nenhum dado encontrado ou erro na leituras");
           
          }
        })
        .catch(function (error) {
          console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
    
      setTimeout(() => {
       // atualizarDisco_geral();
      //  myChart.destroy();
      // eliminar_disco();
      }, 5000);
    }
   function eliminar_disco(){
    if(myChart_disk_geral!=undefined){
    myChart_disk_geral.data.labels.shift();
    myChart_disk_geral.data.datasets.forEach(dataset => {
      dataset.data.shift();
 
    });
      myChart_disk_geral.data.labels.push(tempoLeitura[tempoLeitura.length - 1])
      myChart_disk_geral.data.datasets.forEach((dataset, n) => {
        dataset.data.push(conjunto_2_dataset_disco_geral[n].data[conjunto_2_dataset_disco_geral[n].data.length - 1])
     
      });
    myChart_disk.update();
    myChart_disk_geral.update();
   }}