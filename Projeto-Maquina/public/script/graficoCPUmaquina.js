window.onload = quantidadeNucleos();

let leituraUsoPorc_CPU = [];
var conjunto_dataset_CPU = [];
var dataset_completo_CPU = {};
var tempoLeitura = [];

var myChart = undefined;
function separar(conjunto_dataset) {
  let valor = [];
  for (let i = 0; i < conjunto_dataset.length; i++) {
    valor.push(conjunto_dataset[i]);
  }

  return valor;
}
var maquina_atualmente = NaN;
var componente_atualmente = NaN;
var vezes = 0;
var mudanca;
function plotarCPU(conjunto_dataset, tempoLeitura) {
  if (vezes != 0) {
    if (maquina_atual.value != maquina_atualmente || componente_atualmente!=componenteCPU_valor.value ||  componente_memoria_atualmente!=componenteMem_valor.value ||
      componente_disco_atualmente!=componenteDisco_valor.value) {

      destruir_tudo()
      vezes = 0;
    }
  }

  if (myChart != undefined && vezes != 0) {

    atualizarGrafico(tempoLeitura)
  }

  else {
    mudanca = tempoLeitura
    vezes++
    maquina_atualmente = maquina_atual.value;
    componente_atualmente=componenteCPU_valor.value
    componente_memoria_atualmente=componenteMem_valor.value
    componente_disco_atualmente=componenteDisco_valor.value
    atualizarComponentesCPU()
    myChart = criarGrafico('cpu_chart', conjunto_dataset, tempoLeitura)
  

  }
}
var numero_nucleos = 0;

function criarGrafico(idCanvas, conjunto_dataset, tempoLeitura) {
  let ctx = document.getElementById(idCanvas).getContext("2d");
  return new Chart(ctx, {
    type: "bar",
    data: {
      labels: tempoLeitura,
      datasets: separar(conjunto_dataset),

    }, options: {
      scales: {
        yAxes: [{
          ticks: {
            suggestedMin: 0,
            suggestedMax: 100
          }
        }]
      }
    }
  });
}

function atualizarGrafico(tempoLeitura) {
  if (!mudanca.includes(tempoLeitura[tempoLeitura.length - 1])) {
    adicionar_eliminar_novos_valores(tempoLeitura);
  
  }
}
function eliminar_cpu(tempoLeitura){
  mudanca = tempoLeitura
  let conta = separar(conjunto_dataset_CPU);
  myChart.data.labels.shift();
  myChart.data.labels.push(tempoLeitura[tempoLeitura.length - 1])
  myChart.data.datasets.forEach(dataset => {
    dataset.data.shift();
    dataset.backgroundColor.shift();
  });
  myChart.data.datasets.forEach((dataset, n) => {
    dataset.data.push(conta[n].data[conta[n].data.length - 1])
    dataset.backgroundColor.push(conta[n].backgroundColor[conta[n].backgroundColor.length - 1])
  });
  myChart.update();
  //myChart_cpu_geral.update();
  
}


function quantidadeNucleos() {
  let numCore = [];
  fetch("http://localhost:3000/leituras/numCore", { cache: "no-store" })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {

          let registro = resposta;
          numCore.push(registro[0].NumCore);

          let valor = parseInt(registro[0].NumCore);
          numero_nucleos = valor
          atualizarCPU(valor);
        });
      } else {
        console.error("Nenhum dado encontrado ou erro na leituras");
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });



}

function atualizarCPU(numCore) {
  numCore = numero_nucleos;
  conjunto_dataset_CPU = [];

  for (let x = 1; numCore >= x; x++) {
    fetch(`http://localhost:3000/leituras/dadosCore/${x}/${maquina_atual.value}/${componenteCPU_valor.value}`, {
      cache: "no-store",
    })
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (resposta) {

            let registro = resposta;
             if(registro!=undefined && registro[0]!=undefined && registro[0].ativado.data[0]==1 &&  registro.length!=0){
              cpu_chart.style.display='block'
              CPU_AVISO.innerHTML=''
            tempoLeitura = [];
            leituraUsoPorc_CPU = [];
            cores = [];
            metrica = registro[0].metrica;

            for (n = registro.length - 1; n >= 0; n--) {

              leituraUsoPorc_CPU.push(registro[n].valor);

              tempoLeitura.push(registro[n].hora);
              if (parseFloat(registro[n].valor) > parseFloat(registro[n].maximo)) {
                cores.push('#ff6384')
              } else if (parseFloat(registro[n].valor) < parseFloat(registro[n].minimo)) {
                cores.push('#ffce56')
              } else {
                cores.push('#17a2b8')
              }
              parametro_minimo.innerHTML = `${registro[0].minimo} ${metrica}`
              parametro_maximo.innerHTML = `${registro[0].maximo} ${metrica}`
            }

            dataset_completo_CPU = {
              label: `${metrica} de utilização Core ${x}`,
              data: leituraUsoPorc_CPU,
              fill: true,
              backgroundColor: cores,

            };

            conjunto_dataset_CPU.push(dataset_completo_CPU);
            if (conjunto_dataset_CPU.length % numCore == 0) {
              plotarCPU(conjunto_dataset_CPU, tempoLeitura);
            }
          }
          else{
            cpu_chart.style.display='none'
            CPU_AVISO.innerHTML='Componente Desativado ou sem leituras, comunique com seu gerente para mais detalhes. Se o erro persistir reinicie a página'
          }
          });
        } else {
          console.error("Nenhum dado encontrado ou erro na leituras");
        }
      })
      .catch(function (error) {
        console.error(
          `Erro na obtenção dos dados p/ gráfico: ${error.message}`
        );
      });
  }
  setTimeout(() => {
    atualizarCPU(numCore);

  }, 5000);
}
