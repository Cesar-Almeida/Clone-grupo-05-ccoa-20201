var todos_os_canvas = ['cpu_geral_chart', 'cpu_geral_chart_temp', 'cpu_geral_chart_clock']
var todos_os_avisos =['AVISO_geral_percent','AVISO_geral_temp','AVISO_geral_clock']
function atualizarComponentesCPU() {
    var cpu_total_dentro = 0;
    var cpu_total_minimo = 0;
    var cpu_total_Maximo = 0;

    for (let i = 1; i <= 3; i++) {

        fetch(`http://localhost:3000/leituras/dadosCoreComponente/${numero_nucleos}/${maquina_atual.value}/${i}`, {
            cache: "no-store",
        })
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (resposta) {

                        let registro = resposta;
                        if(registro!=undefined && registro[0]!=undefined && registro[0].ativado.data[0]==1  && registro.length!=0){
                            let  grafico = document.getElementById(todos_os_canvas[i - 1])
                            grafico.style.display='block'
                            let mensagem = document.getElementById(todos_os_avisos[i-1])
                            mensagem.innerHTML = ''

                        metrica = registro[0].metrica;
                        cpu_total_dentro = 0;
                        cpu_total_minimo = 0;
                        cpu_total_Maximo = 0;
                        for (n = registro.length - 1; n >= 0; n--) {
                            if (parseFloat(registro[n].valor) > parseFloat(registro[n].maximo)) {

                                cpu_total_Maximo++
                            } else if (parseFloat(registro[n].valor) < parseFloat(registro[n].minimo)) {

                                cpu_total_minimo++
                            } else {

                                cpu_total_dentro++
                            }

                        }
                        plotar_cpu_geral(todos_os_canvas[i - 1], cpu_total_Maximo, cpu_total_minimo, cpu_total_dentro)
                    }else{
                        let  grafico = document.getElementById(todos_os_canvas[i - 1])
                        grafico.style.display='none'
                       let mensagem = document.getElementById(todos_os_avisos[i-1])
                        mensagem.innerHTML = 'Componente Desativado ou sem leituras, comunique com seu gerente para mais detalhes'
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
    myChart_cpu_geral = []
}
function plotar_cpu_geral(todos_os_canvas, maximo, minimo, ideal) {
    criarGrafico_rosca(todos_os_canvas, ideal, minimo, maximo)

}
var myChart_cpu_geral = []
function criarGrafico_rosca(idCanvas, ideal, minimo, maximo) {
    let contexto = document.getElementById(idCanvas).getContext("2d");
    myChart_cpu_geral.push(new Chart(contexto, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [
                    maximo,
                    ideal,
                    minimo,

                ],
                backgroundColor: [window.chartColors.red,
                window.chartColors.green,
                window.chartColors.yellow,

                ],
                label: 'Dataset 1'
            }],
            labels: [
                'Máximo',
                'Ideal',
                'Minimo',

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
    }));
}

function eliminar_componentes(parametro){
for(let i=0;i<=2;i++)
if(myChart_cpu_geral[i]!=undefined){
myChart_cpu_geral[i].destroy()
if(parametro==1){
    atualizarComponentesCPU()
}}
}