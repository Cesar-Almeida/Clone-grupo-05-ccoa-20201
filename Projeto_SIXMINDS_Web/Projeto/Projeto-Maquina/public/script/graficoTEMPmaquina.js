// atualizar_temperatura();
// function atualizar_temperatura() {

//     fetch('http://localhost:3000/leituras/pegarumaleituradetemperatura', { cache: 'no-store' }).then(function (response) {
//         if (response.ok) {

//             response.json().then(function (resposta) {

//                 console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);


//                 var registro = resposta;
//                 console.log(registro)
//                 const valor_temperatura = registro[0].valor;
//                 console.log(valor_temperatura)

//                 bar_temperatura.innerHTML = `
//                                                         <div class="progress-bar" role="progressbar"
//                                             style="width:${valor_temperatura}%; background-color: red;" aria-valuenow="25"
//                                             aria-valuemin="0" aria-valuemax="100">${valor_temperatura}°C</div>
//                                                         `



//             })
//         } else {
//             console.error('Nenhum dado encontrado ou erro na leituras');
//         }
//     }).catch(function (error) {
//         console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
//     });

// }