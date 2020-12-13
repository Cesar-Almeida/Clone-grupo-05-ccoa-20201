// function dados() {
//     roscaChartDataAtm.datasets[0].data = [];
//     for (let cont = 0; cont < 4; cont++) {
//         roscaChartDataAtm.datasets[0].data.push(parseInt(Math.random() * (24 + 1) + 10))
//     }

//     window.myDoughnutAtm.update();
// }

// function dadosSolo() {
//     roscaChartDataSolo.datasets[0].data = [];
//     for (let cont = 0; cont < 4; cont++) {
//         roscaChartDataSolo.datasets[0].data.push(parseInt(Math.random() * (24 + 1) + 10))
//     }

//     window.myDoughnutSolo.update();

// }
// //------------------------  gráfico rosca Atimosfera-------------------------------------------------
// var roscaChartDataAtm = {
//     datasets: [{
//         data: [],
//         legend: 'top',
//         backgroundColor: [
//             '#00FF6F',
//             '#FFF200',
//             '#FF6F00',
//             '#FF1700',
//             // '#2849a7',
//         ],
//         label: [
//             'Ideal',
//             'Alerta',
//             'Emergencial',
//             'Crítico',
//             // 'Blue', 
//         ]
//     }],
//     labels: [
//         'Ideal',
//         'Alerta',
//         'Emergencial',
//         'Crítico',
//         // 'Blue'
//     ]

// };

// function gerarRosquinha() {
    
//     setInterval(function() {
//         var ctx = document.getElementById('rosquinha').getContext('2d');
//         window.myDughnutAtm = new Chart(ctx, {
//             type: 'doughnut',
//             data: roscaChartDataAtm,
//             options: {
//                 animation: false,
//                 responsive: true,
//                 legend: {
//                     position: 'left',
//                     display: true,
//                 },
//                 title: {
//                     text: 'Status dos Sensores',
//                     display: false,
//                 },
//                 animation: {
//                     animateScale: false,
//                     animateRotate: false
//                 }
//             }
//         });
//         dados(window.myDughnutAt)
//     }, 4000)m
// };

// gerarRosquinha();
// //------------------------------------ GRAFICO ROSCA SOLO -----------------------------------------
// var roscaChartDataSolo = {
//     datasets: [{
//         data: [],
//         legend: 'top',
//         backgroundColor: [
//             '#FF1700',
//             '#FFF200',
//             '#FF6F00',
//             '#00FF6F',
//             // '#2849a7',
//         ],
//         label: [
//             'Ideal',
//             'Alerta',
//             'Emergencial',
//             'Crítico',
//             // 'Blue', 
//         ]
//     }],
//     labels: [
//         'Ideal',
//         'Alerta',
//         'Emergencial',
//         'Crítico',
//         // 'Blue'
//     ]

// };


// function gerarRosquinhaSolo() {
//     setInterval(function() {
//         var ctx = document.getElementById('rosquinha_solo').getContext('2d');
//         window.myDoughnutSolo = new Chart(ctx, {
//             type: 'doughnut',
//             data: roscaChartDataSolo,
//             options: {
//                 animation: false,
//                 responsive: true,
//                 legend: {
//                     position: 'left',
//                     display: true,
//                 },
//                 title: {
//                     text: 'Status dos Sensores',
//                     display: false,
//                 },
//                 animation: {
//                     animateScale: false,
//                     animateRotate: false
//                 }
//             }
//         });
//         dadosSolo()
//     }, 4000)
// };

// gerarRosquinhaSolo();



//-------------------------geração de dados ------------------------------------------------

window.onload = atualizarRosca();
function atualizarRosca() {

    fetch('/leituras/tempo-real', { cache: 'no-store' }).then(function (response) {
        if (response.ok) {

            response.json().then(function (resposta) {

                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    var critico = 0;
                    var ideal = 0;
                    var alerta = 0;
                    var emergencial= 0;
            

                    const contexto = document.getElementById(`rosquinha`).getContext('2d');

					var registro = resposta;

                    var largura = registro.length;
                    for(let x=0;x<largura;x++){
                        let sens=registro[x].temp
                        if(sens<=19){
                            critico+=critico+1;
                        }
                        else if(sens<=20){
                            emergencial=emergencial+1;
                        }
                        else if(sens<=30){
                            ideal=ideal+1;
                        }
                        else {
                            alerta=alerta+1;
                        }
                    }
                    for(let x=0;x<largura;x++){
                        let sens=registro[x].umid;
                        if(sens<=19){
                            critico=critico+1;
                            
                        }
                        else if(sens<=20){ 
                            emergencial=emergencial+1;
                        }
                        else if(sens<=30){
                            ideal=ideal+1;
                        }
                        else {
                            alerta=alerta+1;
                        }
                    }
        
                    // document.getElementById(`numerodedentro${i}`).innerHTML = `${dado1}%`

                    plotarGraficoRosca(contexto, critico,emergencial,alerta,ideal);
                    // validargeladeira();
            })
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    }).catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

    setTimeout(() => {
        atualizarRosca();

    }, 5000);
}
//--------------------------------
window.onload = atualizarRosca1();
function atualizarRosca1() {

    fetch('/leituras/tempo-real1', { cache: 'no-store' }).then(function (response) {
        if (response.ok) {

            response.json().then(function (resposta) {

                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    var critico = 0;
                    var ideal = 0;
                    var alerta = 0;
                    var emergencial= 0;
            

                    const contexto = document.getElementById(`rosquinha_solo`).getContext('2d');

					var registro = resposta;

                    console.log(critico);
                    console.log(alerta);
                    console.log(ideal);
                    console.log(emergencial);
                    var largura = registro.length;
                    for(let x=0;x<largura;x++){
                        let sens=registro[x].temp
                        if(sens<=19){
                            critico+=critico+1;
                        }
                        else if(sens<=20){
                            emergencial=emergencial+1;
                        }
                        else if(sens<=30){
                            ideal=ideal+1;
                        }
                        else {
                            alerta=alerta+1;
                        }
                    }
                    for(let x=0;x<largura;x++){
                        let sens=registro[x].umid;
                        if(sens<=19){
                            critico=critico+1;
                            
                        }
                        else if(sens<=20){
                            emergencial=emergencial+1;
                        }
                        else if(sens<=30){
                            ideal=ideal+1;
                        }
                        else {
                            alerta=alerta+1;
                        }
                    }
                    console.log(critico);
                    console.log(alerta);
                    console.log(ideal);
                    console.log(emergencial);
                    // document.getElementById(`numerodedentro${i}`).innerHTML = `${dado1}%`

                    plotarGraficoRosca1(contexto, critico,emergencial,alerta,ideal);
                    // validargeladeira();
            })
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    }).catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

    setTimeout(() => {
        atualizarRosca1();

    }, 5000);
}











