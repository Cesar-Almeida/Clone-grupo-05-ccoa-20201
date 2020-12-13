var grafico1 = [];
var teste = 0;
atualizarGrafico();

function plotarGrafico(contexto, dado, dado2) {

    if (teste >= 1) {
        grafico1.destroy();
        teste = 0;
    }
    grafico1 = new Chart(contexto, {
        type: 'horizontalBar',
        data: {

            labels: [`Área 1`, `Área 2`, `Área 3`, `Área 4`, `Área 5`],

            datasets: [{
                label: 'Temperatura °C',
                backgroundColor: window.chartColors.yellow,
                borderWidth: 1,
                data:
                    dado

            }, {
                label: 'Umidade %',
                backgroundColor: window.chartColors.blue,
                data:
                    dado2

            }
            ],

        },
        options: {

            scales: {

                xAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true,
                        steps: 10,
                        stepValue: 5,
                        max: 100
                    }
                }]
            },
        }
    });
    teste++;
}
/*SOLO*/
var grafico2 = [];
var teste2 = 0;
atualizarGraficosolo();

function plotarGrafico2(contexto, dado, dado2) {

    if (teste2 >= 1) {
        grafico2.destroy();
        teste2 = 0;
    }

    grafico2 = new Chart(contexto, {
        // The type of chart we want to create
        type: 'horizontalBar',

        // The data for our dataset

        data: {

            labels: [`Área 1`, `Área 2`, `Área 3`, `Área 4`, `Área 5`],

            datasets: [{
                label: 'Temperatura °C',
                backgroundColor: window.chartColors.yellow,
                borderWidth: 1,
                data:
                    dado

            }, {
                label: 'Umidade %',
                backgroundColor: window.chartColors.blue,
                data:
                    dado2

            }],
        },
        options: {

            scales: {

                xAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true,
                        steps: 10,
                        stepValue: 5,
                        max: 100
                    }
                }]
            },
        }
    });
    teste2++;
}
var grafico3 = [];
var teste3 = 0;
atualizarRosca();

function plotarGraficoRosca(contexto, critico, emergencial, alerta, ideal) {

    if (teste3 >= 1) {
        grafico3.destroy();
        teste3 = 0;
    }

    grafico3 = new Chart(contexto, {
        // The type of chart we want to create
        type: 'doughnut',
        data: {
            datasets: [{
                data: [
                    critico,
                    ideal,
                    alerta,
                    emergencial,
                ],
                backgroundColor: [
                    window.chartColors.red,
                    window.chartColors.green,
                    window.chartColors.yellow,
                    window.chartColors.orange,
                ],
                label: 'Dataset 1'
            }],
            labels: [
                'Critico',
                'ideal',
                'alerta',
                'emergencial',
            ]
        },
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },

            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });
    teste3++;
}


var grafico4 = [];
var teste4 = 0;
atualizarRosca1();
function plotarGraficoRosca1(contexto, critico, emergencial, alerta, ideal) {
    if (teste4 >= 1) {
        grafico4.destroy();
        teste4 = 0;
    }

    grafico4 = new Chart(contexto, {
        // The type of chart we want to create
        type: 'doughnut',
        data: {
            datasets: [{
                data: [
                    critico,
                    ideal,
                    alerta,
                    emergencial,
                ],
                backgroundColor: [
                    window.chartColors.red,
                    window.chartColors.green,
                    window.chartColors.yellow,
                    window.chartColors.orange,
                ],
                label: 'Dataset 1'
            }],
            labels: [
                'Critico',
                'ideal',
                'alerta',
                'emergencial',
            ]
        },
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },

            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });
    teste4++;
}
