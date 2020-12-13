// atualizarMemoria();

// function plotarMemoria(tempoLeitura, leituraUsoPorc) {
//   var ctx = document.getElementById("memory_chart").getContext("2d");
//   var myChart = new Chart(ctx, {
//     type: "line",
//     data: {
//       labels: tempoLeitura,
//       datasets: [
//         {
//           label: "% de utilização memória",
//           data: leituraUsoPorc,
//           fill: true,
//           backgroundColor: "rgba(170, 120, 166, 0.30)",
//           borderColor: "rgba(170, 120, 166, 0.69)",
//           borderWidth: 1,
//         },
//       ],
//     },
//     options: {
//       responsive: true,
//       scales: {
//         yAxes: [
//           {
//             ticks: {
//               beginAtZero: true,
//             },
//           },
//         ],
//       },
//     },
//   });
// }

// window.onload = atualizarMemoria();
// function atualizarMemoria() {
//   fetch("http://localhost:3000/leituras/dadosMemoriaUsoPerc", { cache: "no-store" })
//     .then(function (response) {
//       if (response.ok) {
//         response.json().then(function (resposta) {
//           console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
//           let registro = resposta;
//           console.log(registro);
//           console.log(registro.length);
//           let leituraUsoPorc = [];
//           let tempoLeitura = [];

//           for (n = registro.length - 1; n >= 0; n--) {
//             leituraUsoPorc.push(registro[n].valor);
//             tempoLeitura.push(registro[n].hora);
//           }
//           console.log(leituraUsoPorc);

//           plotarMemoria(tempoLeitura, leituraUsoPorc);
//         });
//       } else {
//         console.error("Nenhum dado encontrado ou erro na leituras");
//       }
//     })
//     .catch(function (error) {
//       console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
//     });

//   setTimeout(() => {
//  //   atualizarMemoria();
//   }, 5000);
// }