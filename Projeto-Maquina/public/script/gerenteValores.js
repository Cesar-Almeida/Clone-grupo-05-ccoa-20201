numeroMaquina()


function numeroMaquina() {
  var globalTipo = [];
  var globalId = [];
  var usuario_maquina;
  var idUsuario = sessionStorage.idUsuario_usuario_meuapp;
  var fkSupervisor = sessionStorage.fkSupervisor_usuario_meuapp;
  if(fkSupervisor=='null'){
      usuario_maquina=idUsuario
  }else{
      usuario_maquina=fkSupervisor
  }

fetch(`http://localhost:3000/leituras/recebermaquinas/${usuario_maquina}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {

      response.json().then(function (resposta) {

        // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

        for (i = 0; i < resposta.length; i++) {


          var registro = resposta[i];
          const tipodaMaquina = registro.tipoMaquina;
          const iddaMaquina = registro.idMaquina;

          globalTipo.push(tipodaMaquina);
          globalId.push(iddaMaquina);

        } 
        numeroNucleos(globalTipo, globalId);
      })
    } else {
      console.error('Nenhum dado encontrado ou erro na leituras');
    }
  }).catch(function (error) {
    console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
  });

}


function numeroNucleos(globalTipo, globalId) {
  var numCoreVariavel = [];
  fetch("http://localhost:3000/leituras/numCore", { cache: "no-store" })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {

          let registro = resposta;
          numCoreVariavel.push(registro[0].NumCore);

          // console.log(registro[].NumCore);
          // numCoreVariavel = (registro[0].NumCore);
          leituraCadaComp(globalTipo, globalId, numCoreVariavel);
        });
      } else {
        console.error("Nenhum dado encontrado ou erro na leituras");
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function leituraCadaComp(globalTipo, globalId, numCoreVariavel) {
  var qntRegistro = numCoreVariavel[0];
  // console.log(qntRegistro);
  criarTabelas(globalId.length);

  for (let i = 0; i < globalId.length; i++) {

    fetch(`http://localhost:3000/leituras/dadosdeCadaComp/${globalId[i]}/${qntRegistro}`, { cache: "no-store" })
      .then(function (response) {
        
        if (response.ok) {
          response.json().then(function (resposta) {
            console.log(resposta[0])
            var totalRegistro=resposta.length;
            console.log("joooooooooo "+totalRegistro);
            var soma = 0.0;
            var mediaFinal;
            var disc;
            var memo;
            var minCpu;
            var maxCpu;
            var minDisc;
            var maxDisc;
            var maxMemo;
            var minMemo;
            var totalCpu = [];
            var totalDisc = [];
            var totalMemo = [];

            // console.log(resposta);
            for (let x = 0; x < totalRegistro; x++) {
              if(resposta[x]!=undefined){
                if (resposta[x].nomeComponente == "CPU_uso") {
                  atual = parseInt(resposta[x].valor);
                  soma = soma + atual;
                  mediaFinal = parseInt(soma / numCoreVariavel[0]);
                  minCpu = resposta[x].minimo;
                  maxCpu = resposta[x].maximo;
                }
                else if (resposta[x].nomeComponente == "Disco_uso") {
                  disc = resposta[x].valor;
                  minDisc = resposta[x].minimo;
                  maxDisc = resposta[x].maximo;
                }
                else if (resposta[x].nomeComponente == "Memória_uso") {
                  memo = resposta[x].valor;
                  minMemo = resposta[x].minimo;
                  maxMemo = resposta[x].maximo;
                }
              }
            }
            totalCpu.push(mediaFinal, minCpu, maxCpu);
            totalDisc.push(disc, minDisc, maxDisc);
            totalMemo.push(memo, minMemo, maxMemo);
            // console.log(mediaFinal);
            // console.log(disc);
            // console.log(memo);
            // console.log("----------------")
            // console.log(totalCpu);
            // console.log(totalDisc);
            // console.log(totalMemo);

            // console.log(globalId.length);                     
              // setInterval(function(){                
                // caixa_maquinas.setAtributte("style", "transition: width 2s;");                
                // caixa_maquinas.style.opacity = "1%";
                // caixa_maquinas.style.transition = "opacity 3s";                
                // caixa_maquinas.style.opacity = "100%";
                atribuirDados(totalMemo, totalCpu, totalDisc, i, globalTipo, globalId);     
                igualarClass(totalMemo, totalCpu, totalDisc, i,globalId);
              // }, 5000);
           


          
          });
        } else {
          console.error("Nenhum dado encontrado ou erro na leituras");
        }
      })
      .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });
  }

}

function atribuirDados(totalMemo, totalCpu, totalDisc, numMaqui, globalTipo, globalId) {

  // console.log("globalTipo" + globalTipo[0]);

  let comp = ["mem", "cpu", "disc"];
  let compo_maq = [totalMemo, totalCpu, totalDisc];

  for (c in comp) {
    let maquina = numMaqui + 1;

    for (let w = 1; w <= 3; w++) {

      let componente = document.getElementById(`${comp[c]}${maquina}_${w}`);

      if (comp[c] == "mem") {
        if(totalMemo[w-1]==undefined){
          componente.innerHTML="<b style='color:white'>?</b>";
        }
        else{
          componente.innerHTML = totalMemo[w - 1];
        }
        
      }
      else if (comp[c] == "cpu") {
        if(totalCpu[w-1]==undefined){
          componente.innerHTML="<b style='color:white'>?</b>";
        }
        else{
          componente.innerHTML = totalCpu[w - 1];
        }
      }
      else if (comp[c] == "disc") {
        if(totalDisc[w-1]==undefined){
          componente.innerHTML="<b style='color:white'>?</b>";
        }
        else{
          componente.innerHTML = totalDisc[w - 1];
        }
        
      }

    }

    maquina++;

  }

  for (let m = 1; m <= globalTipo.length; m++) {

    let maquina_tipo = document.getElementById(`tipo_maquina${m}`);
    maquina_tipo.innerHTML = "Tipo Máquina: " + globalTipo[m - 1];

    let id_maquina = document.getElementById(`id_maquina${m}`);
    id_maquina.innerHTML = "ID Máquina: " + globalId[m - 1];

  }
   
}
// setInterval(atualizarTable, 5000);
function piscar_icone(icone) {
  
  // console.log("piscando");

  if(icone.style.display = "none"){
    icone.style.display = "block";
  }
  // setTimeout(icone + ".style.display='inline-block'", 100);
}




function criarTabelas(numMaqui) {
  // console.log(numMaqui);

  let cont_col = 1;

  //caixa_maquinas.innerHTML = '<div class="row">';

  let cont_comp_cpu = 1;
  let cont_comp_disc = 1;
  let cont_comp_mem = 1;
  let vetorForecast=[];
  for (let id_maquina = 1; id_maquina <= numMaqui; id_maquina++) {
    vetorForecast.push(id_maquina);


    let caixa = `
    
    
    <div class="col-md-4"> <div id="maquina_${id_maquina}" class="card mb-4 shadow-sm shadow p-3 mb-5 bg-white rounded">      <div class="row ">             
    
    <table id="tabelaInicial${id_maquina}" class="table table-striped table-dark" style="width: 80%;margin: auto;margin-top: 5%; text-align: center;">
    <thead>
        <tr>
            <th scope="col">Memória</th>
            <th scope="col">CPU</th>
            <th scope="col">Disco</th>
        </tr>
    </thead>
    <tbody>
        <tr id="trInicial${id_maquina}">
            <td id="tab${id_maquina}lin1">
                <i id="icone${id_maquina}lin1" style="color: #343a40; min-inline-size: 80px;">
                </i>
            </td>
            <td id="tab${id_maquina}lin2">
                <i id="icone${id_maquina}lin2" style="color: #343a40;min-inline-size: 80px;">
                </i>
            </td>
            <td id="tab${id_maquina}lin3" >
                <i id="icone${id_maquina}lin3" style="color: #343a40; min-inline-size: 80px;">
                </i>
            </td>
        </tr>
    </tbody 
</table>
    
    
    <table class="table table-striped table-dark "                  style="width: 80%;margin: auto;margin-top: 5%;display:none">                   </table>        </div>      <div class="card-body">          <p class="card-text">              <font style="vertical-align: inherit;">                  <font id="id_maquina${id_maquina}" style="vertical-align: inherit;">ID Máquina:</font><br>                  <font id="tipo_maquina${id_maquina}" style="vertical-align: inherit;">Tipo de Máquina</font>              </font>          </p>          <div class="d-flex justify-content-between align-items-center">              <div class="btn-group">                  <button type="button" id="btAmplia${id_maquina}"  class="btn btn-sm btn-outline-secondary"data-toggle="modal" data-target="#ampli${id_maquina}"
                    data-whatever="@mdo"> <font style="vertical-align: inherit;">Ampliar</font>                      </font>                  </button>   
                    
                    <button  id="btForecast${id_maquina}" onclick="criarPDF(${id_maquina - 1})" type="button" id="fore1"  class="btn btn-sm btn-outline-secondary"data-toggle="modal" data-target="#forecast${id_maquina}"
                    data-whatever="@mdo"> <font style="vertical-align: inherit;">Forecast</font>                      </font>                  </button>
                    <button id="btAnalisar${id_maquina}" type="button" class="btn btn-sm btn-outline-secondary">                      <font style="vertical-align: inherit;">                          <font style="vertical-align: inherit;"><a href="DashMaquina.html"                                  style="text-decoration: none; color: #6c757d;"><a                                      href="DashMaquina.html"                                      style="text-decoration: none; color: #6c757d;">Analisar</a></a>                          </font>                      </font>                  </button> </a>              </div          </div>      </div>  </div> </div>
  
  
  
  
                    
                    <div class="modal fade " id="ampli${id_maquina}" tabindex="-1" aria-labelledby="ampli${id_maquina}Label"
                        aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title text-danger" id="ampli${id_maquina}Label">
                                    Máquina ${id_maquina}
                                    </h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span id="close" aria-hidden="true" class="text-dark">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">                
                                  
                                <table class="table table-striped table-light"             >                  <thead>                      <tr>                          <th scope="col">Componente</th>                          <th scope="col">Usado (%)</th>                          <th scope="col">Mínimo</th>                          <th scope="col">Máximo</th>                      </tr>                  </thead>                  <tbody>                      <tr>                          <th id="mem0" scope="row">Memória</th>                          <td id="mem${id_maquina}_${cont_comp_mem}"></td>                          <td id="mem${id_maquina}_${cont_comp_mem + 1}"></td>                          <td id="mem${id_maquina}_${cont_comp_mem + 2}"></td>                      </tr>                      <tr>                          <th id="cpu0" scope="row">CPU</th>                          <td id="cpu${id_maquina}_${cont_comp_cpu}"></td>                          <td id="cpu${id_maquina}_${cont_comp_cpu + 1}"></td>                          <td id="cpu${id_maquina}_${cont_comp_cpu + 2}"></td                      </tr>                      <tr>                          <th id="disc0" scope="row">Disco</th>                          <td id="disc${id_maquina}_${cont_comp_disc}"></td>                          <td id="disc${id_maquina}_${cont_comp_disc + 1}"></td>                          <td id="disc${id_maquina}_${cont_comp_disc + 2}"></td>                      </tr>                  </tbody>              </table>
                                </div>
                                <div class="modal-footer">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal fade " id="forecast${id_maquina}" tabindex="-1" aria-labelledby="forecast${id_maquina}Label"
                    aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-xl">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title text-danger" id="forecast${id_maquina}Label">
                                Máquina ${id_maquina}
                                </h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span id="close" aria-hidden="true" class="text-dark">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                              <div class="row" style="justify-content: space-between;align-items: center;">
                                <h3 style="padding: 1.5%;">Billing & Cost Management Dashboard</h3>
                                <a  id = "botao_pdf_${id_maquina}" type="button" class="btn btn-outline-secondary disabled" style="margin-right:1.5%;height: 147%;" href="boletoPDF.pdf" download = "SixMinds - Boleto: Máquina${id_maquina}">
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                <span class="visually-hidden"><i class="fas fa-file-upload"></i>(pdf)</span>
                                </a>
                              </div>
                              <div class="row">
                              
                                <div class="col">
                                  
                                  <div style="background-color:#e0e0e0">
                                    <h6 style="padding: 3px; ">Resumo de gastos</h6>
                                  </div>
                                  <p style="padding: 1%; font-size: 14px"> Bem-vindo ao console do AWS Account Billing. Os custos previstos para o último mês, o mês até a data atual e o final do mês aparecem abaixo.
                                  </p>
                                  <i>Saldo atual do mês até a data de dezembro de 2020</i>
                                  <h1 id="gastoMes${id_maquina}">$57.86</h1> 
                                  <br>  
                                  <div>
                                    <canvas class="my-100"  id="forecastCanva${id_maquina}"></canvas>
                                  </div>
                                </div>
                                <div class="col">
                                    <h6 style="padding: 3px; background-color:#e0e0e0 ">
                                    Gastos do mês até a data por serviço </h6>
                                    <p style="padding: 3px; font-size: 14px">O gráfico abaixo mostra a proporção dos custos gastos para cada serviço que você usa.</p>
                                    <canvas height=101%  id="roscaCanva${id_maquina}"></canvas>
                                    <br>
                                    <div>
                                      <div class="row" style="padding: 0% 8%;">
                                        <div class="col" style="display: flex; align-items: center;">
                                          <div style="width:26px;height:26px;background-color:#3782d4;"></div>
                                          <div style="padding-left: 5%; font-size:22px">EC2</div>
                                        </div>
                                        <div class="col" style="align-items: center;">
                                          <div      id="valorEC2${id_maquina}"              style="text-align: end;font-size:22px;">$00.00</div>
                                        </div>
                                      </div>
                                      <div class="row" style="padding: 0% 8%;">
                                        <div class="col" style="display: flex; align-items: center;">
                                          <div style="width:26px;height:26px;background-color:#4da94f;"></div>
                                          <div style="padding-left: 5%; font-size:22px">EBS</div>
                                        </div>
                                        <div class="col" style="align-items: center;">
                                          <div       id="valorEBS${id_maquina}"             style="text-align: end;font-size:22px;">$00.00</div>
                                        </div>
                                      </div>
                                      <div class="row" style="padding: 0% 8%;">
                                        <div class="col" style="display: flex; align-items: center;">
                                          <div style="width:26px;height:26px;background-color:#d6a61d;"></div>
                                          <div style="padding-left: 5%; font-size:22px">S3</div>
                                        </div>
                                        <div class="col" style="align-items: center;">
                                          <div       id="valorS3${id_maquina}"               style="text-align: end;font-size:22px;">$00.00</div>
                                        </div>
                                      </div>
                                      <div style="width: 100%;height: 1px;background-color: #e0e0e0;margin-top: 1%;"></div>
                                      <div class="row" style="padding: 0% 8%;">
                                        <div class="col" style="display: flex; align-items: center;">
                                          
                                          <div style=" font-size:18px">Tax</div>
                                        </div>
                                        <div class="col" style="align-items: center;">
                                          <div style="text-align: end;font-size:18px;">$0.00</div>
                                        </div>
                                      </div>
                                      <div class="row" style="padding: 0% 8%;">
                                        <div class="col" style="display: flex; align-items: center;">
                                          
                                          <div style=" font-size:22px">Total</div>
                                        </div>
                                        <div class="col" style="align-items: center;">
                                          <div        id="valorTotal${id_maquina}"                     style="text-align: end;font-size:22px;"></div>
                                        </div>
                                      </div>
                                      
                                    <div
                                </div>
                              </div>
                            </div>
                            <div class="modal-footer">
                            </div>
                        </div>
                    </div>
                </div>
              
  
          
  `;

//------------------------------------

    caixa_maquinas.innerHTML += caixa;
  }
  for(id in vetorForecast){
    //console.log("chegou até o iddavez "+vetorForecast[id]);
    pegarDadosFore(vetorForecast[id]);
   
  }


}


function plotarFore(idVez,gastoMensal,mes, previsao) {
  var ctx = document.getElementById(`forecastCanva${idVez}`).getContext("2d");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: mes,//["JAN","FEV","MAR"]
      datasets: [
        {
          label:"$",
          data: gastoMensal,
          fill: true,
          backgroundColor: ["#3782d4","#3782d4","#4da94f"],

          borderColor: ["#3782d4","#3782d4","#4da94f"],
          borderWidth: 1,
        },
        // {
        //   label:"$",
        //   data: [1,2,4,5,3],
        //   fill: true,
        //   backgroundColor: ["#4da94f"],

        //   borderColor: ["#4da94f"],
        //   borderWidth: 1,
        // }
      ],
    },
    options: {
      
      responsive: true,
      legend: { position: "none" },
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


let listaEC2=[];
let listaEBS=[];
let listaS3=[];

function plotarRosca(idVez, valorTotal) {

    let ec2Valor=valorTotal*0.63;
    let ebsValor=valorTotal*0.21;
    let s3Valor=valorTotal*0.16;
    let totale=valorTotal*1;

  let valorec2 = document.getElementById(`valorEC2${idVez}`);
  valorec2.innerHTML=(`$${ec2Valor.toFixed(2)}`);
  listaEC2.push(ec2Valor.toFixed(2));
  let valorebs = document.getElementById(`valorEBS${idVez}`);
  valorebs.innerHTML=(`$${ebsValor.toFixed(2)}`);
  listaEBS.push(ebsValor.toFixed(2));
  let valors3 = document.getElementById(`valorS3${idVez}`);
  valors3.innerHTML=(`$${s3Valor.toFixed(2)}`);
  listaS3.push(s3Valor.toFixed(2));

 // console.log(`LISTA EC2: `+ listaEC2);
//console.log(`LISTA EBS: `+ listaEBS);
//console.log(`LISTA S3: `+ listaS3);
  let total = document.getElementById(`valorTotal${idVez}`);
  total.innerHTML = (`$${totale.toFixed(2)}`);
  let gastoMes = document.getElementById(`gastoMes${idVez}`);
  gastoMes.innerHTML =(`$${totale.toFixed(2)}`);
  
  
  
  var ctx = document.getElementById(`roscaCanva${idVez}`).getContext("2d");
  var myChart = new Chart(ctx, {
    type: "doughnut",

    plugins:[{
      beforeDraw: function(chart) {
        if (chart.config.options.elements.center) {
          // Get ctx from string
          var ctx = chart.chart.ctx;
    
          // Get options from the center object in options
          var centerConfig = chart.config.options.elements.center;
          var fontStyle = centerConfig.fontStyle || 'Arial';
          var txt = centerConfig.text;
          var color = centerConfig.color || '#000';
          var maxFontSize = centerConfig.maxFontSize || 75;
          var sidePadding = centerConfig.sidePadding || 20;
          var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
          // Start with a base font of 30px
          ctx.font = "30px " + fontStyle;
    
          // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
          var stringWidth = ctx.measureText(txt).width;
          var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;
    
          // Find out how much the font can grow in width.
          var widthRatio = elementWidth / stringWidth;
          var newFontSize = Math.floor(30 * widthRatio);
          var elementHeight = (chart.innerRadius * 2);
    
          // Pick a new font size so it will not be larger than the height of label.
          var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
          var minFontSize = centerConfig.minFontSize;
          var lineHeight = centerConfig.lineHeight || 25;
          var wrapText = false;
    
          if (minFontSize === undefined) {
            minFontSize = 20;
          }
    
          if (minFontSize && fontSizeToUse < minFontSize) {
            fontSizeToUse = minFontSize;
            wrapText = true;
          }
    
          // Set font settings to draw it correctly.
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
          var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
          ctx.font = fontSizeToUse + "px " + fontStyle;
          ctx.fillStyle = color;
    
          if (!wrapText) {
            ctx.fillText(txt, centerX, centerY);
            return;
          }
    
          var words = txt.split(' ');
          var line = '';
          var lines = [];
    
          // Break words up into multiple lines if necessary
          for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = ctx.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > elementWidth && n > 0) {
              lines.push(line);
              line = words[n] + ' ';
            } else {
              line = testLine;
            }
          }
    
          // Move the center up depending on line height and number of lines
          centerY -= (lines.length / 2) * lineHeight;
    
          for (var n = 0; n < lines.length; n++) {
            ctx.fillText(lines[n], centerX, centerY);
            centerY += lineHeight;
          }
          //Draw text in center
          ctx.fillText(line, centerX, centerY);
        }
      }
    }],

    data: {
      labels: ["EC2", "EBS", "S3"],
      datasets: [
        {
          label:"$",
          data: [ec2Valor,ebsValor,s3Valor],
          fill: true,
          backgroundColor: ["#3782d4","#4da94f","#d6a61d"],

          borderColor: ["#3782d4","#4da94f","#d6a61d"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      
      responsive: true,
      legend: { position: "none" },
      elements: {
        center: {
          text: (`$${totale}`),
          color: 'black', // Default is #000000
          fontStyle: 'Arial', // Default is Arial
          sidePadding: 20, // Default is 20 (as a percentage)
          minFontSize: 20, // Default is 20 (in px), set to false and text will not wrap.
          lineHeight: 25 // Default is 25 (in px), used for when text wraps
        }
      }
    },
  });
}



function pegarDadosFore(idDaVez) {
  fetch(`http://localhost:3000/leituras/forecastMeses/${idDaVez}`, { cache: "no-store" })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
          let registro = resposta;
          
          let gastoMensal = [];
          let mes = [];
          let mesNumero=[];


          for (n = 0; n <= registro.length - 1; n++) {
            gastoMensal.push(((((registro[n].tempoDistintos * 5) / 3600)*50.0116)+0.80).toFixed(2));
            mes.push(registro[n].mes);
            mesNumero.push(n+1);
          }
          console.log("GASTO MENSAL:"+gastoMensal);
          console.log("GASTO MENSAL:"+mes);
          console.log("GASTO MENSAL:"+mesNumero);
          
      
          plotarRosca(idDaVez,gastoMensal[gastoMensal.length -1]);
          progressao(idDaVez,gastoMensal,mes,mesNumero,gastoMensal);
        });
      } else {
        console.error("Nenhum dado encontrado ou erro na leituras");
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

  setTimeout(() => {
  //  atualizarDisco();
   // myChart.destroy();
  }, 5000);
}

function progressao(idDaVez,gastoMensal,mes,meses,valores){
  let botaoPDF = document.getElementById(`botao_pdf_${idDaVez}`);
  botaoPDF.innerHTML = `
  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  <span class="visually-hidden"><i class="fas fa-file-upload"></i>(pdf)</span>`;

setTimeout(function(){
  botaoPDF.innerHTML = `<span class="visually-hidden"><i class="fas fa-file-upload"></i>(pdf)</span>`;
  botaoPDF.classList.remove(`disabled`);

  },5000);

  fetch(`http://localhost:3000/leituras/requireProgressao/${meses}/${valores}`, { cache: "no-store" })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          console.log("OLHA AQUI: "+resposta[0]);
          gastoMensal.push(resposta[0].toFixed(2));
          mes.push("Forecast");
          plotarFore(idDaVez, gastoMensal, mes, resposta[0]);
        });
        
      } else {
        console.error("Nenhum dado encontrado ou erro na leituras");
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}


var iconesCriticos=[];
function igualarClass(totalMemo, totalCpu, totalDisc, num_maqui,globalId) {
  var comp = ["mem", "disc", "cpu"];
  // console.log("num_maqui " + (num_maqui+1))
  let maquina = num_maqui + 1;
  // let cont = 1;

  for(let r = 1; r<=3; r++){

      let caixa_icone  =document.getElementById(`tab${maquina}lin${r}`);
      console.log("Essa é a caixa_icone: "+caixa_icone.innerHTML);
      let icone  =document.getElementById(`icone${maquina}lin${r}`);
      console.log("Esse é 0 icone: "+icone.innerHTML);
    


      
      if (r==1) {    
        if(totalMemo[0]!=undefined){
            if (totalMemo[0] > totalMemo[2]) {          
            caixa_icone.className = "critico";
            icone.className = "fas fa-skull";
            iconesCriticos.push(icone);
            
          }
          else if (totalMemo[0] > totalMemo[1] && totalMemo[0] < totalMemo[2]) {
            
            caixa_icone.className = "alerta"; //"fas fa-exclamation-circle";
            icone.className = "fas fa-exclamation-circle";

          }
          else{          
            caixa_icone.className = "normal";
            icone.className = "fas fa-check";
          }
        }   
        else{
          caixa_icone.className = "desativado";
          icone.className = "fas fa-question";
        }
      }
      if (r==2) {
        if(totalCpu[0]!=undefined){
          if (totalCpu[0] > totalCpu[2]) {
            caixa_icone.className = "critico";
            icone.className = "fas fa-skull";
            iconesCriticos.push(icone);

          }
          else if (totalCpu[0] > totalCpu[1] && totalCpu[0] < totalCpu[2]) {
            
            caixa_icone.className = "alerta"; //"fas fa-exclamation-circle";
          icone.className = "fas fa-exclamation-circle";}
          else{
            
            caixa_icone.className = "normal";
            icone.className = "fas fa-check";
          }
        }
        else{
          caixa_icone.className = "desativado";
          icone.className = "fas fa-question";
        }
      }
      if (r==3) {
        if(totalDisc[0]!=undefined){
          if (totalDisc[0] > totalDisc[2]) {
            caixa_icone.className = "critico";
            icone.className = "fas fa-skull";
            iconesCriticos.push(icone);

          }
          else if (totalDisc[0] > totalDisc[1] && totalDisc[0] < totalDisc[2]) {
            
            caixa_icone.className = "alerta"; //"fas fa-exclamation-circle";
            icone.className = "fas fa-exclamation-circle";}
          else{
            
            caixa_icone.className="normal";
            icone.className="fas fa-check";
          }
        }
        else{
          caixa_icone.className = "desativado";
          icone.className = "fas fa-question";
        }
      }
      
  }



  for (c in comp) {
    // console.log(maquina);
    for (let w = 1; w <= 3; w++) {

      let componente = document.getElementById(`${comp[c]}${maquina}_${w}`);

      if (comp[c] == "mem") {   
        if(totalMemo[0]!=undefined){
            if (totalMemo[0] > totalMemo[2]) {
            componente.className = "critico";
          }
          else if (totalMemo[0] > totalMemo[1] && totalMemo[0] < totalMemo[2]) {
            componente.className = "alerta";
          }
          else{
            componente.className = "normal";
          }
        }    
        else{
          componente.className="desativado";
        }
      }


      if (comp[c] == "cpu") {
        if(totalCpu[0]!=undefined){
          if (totalCpu[0] > totalCpu[2]) {
            componente.className = "critico";

          }
          else if (totalCpu[0] > totalCpu[1] && totalCpu[0] < totalCpu[2]) {
            componente.className = "alerta";
    
          }
          else{
            componente.className = "normal";

          }
        }
        else{
            componente.className="desativado";
        }
      }


      if (comp[c] == "disc") {
        if(totalDisc[0]!=undefined){
          if (totalDisc[0] > totalDisc[2]) {
            componente.className = "critico";          
          }
          else if (totalDisc[0] > totalDisc[1] && totalDisc[0] < totalDisc[2]) {
            componente.className = "alerta";          
          }
          else{
            componente.className = "normal";
          }
        }
        else{
          componente.className="desativado";
        }
      }

    }

  }
  temporizar(num_maqui,globalId);
}


function temporizar(num_maqui,globalId){
  //console.log(num_maqui);
  var elements = document.getElementsByClassName("modal-backdrop fade show");
  //console.log(elements.length);
  if(elements.length == 0){
      if(num_maqui+1>=globalId.length){
      var temporizador;
      var contador=0;
      // console.log(iconesCriticos);
                
      temporizador=setInterval(() => {
        for(ic in iconesCriticos){
          iconesCriticos[ic].style.visibility = "initial";
          contador=contador+1;
          // console.log(contador);
        }
        setTimeout(() => {
          for(ic in iconesCriticos){
            iconesCriticos[ic].style.visibility = "hidden";
          }
          if(contador>=8){
            if(elements.length==0){
              caixa_maquinas.innerHTML = "";
              iconesCriticos=[];
              listaEC2=[];
              listaEBS=[];
              listaS3=[];
              clearInterval(temporizador);
              numeroMaquina();
            }
          }
        }, 1000);
        ;
      }, 2000);  
    }
  }
    
}

function removeElementsByClass(){
  
}



function criarPDF(id_maquina){

  var numeroEC2=listaEC2[id_maquina];
  var numeroEBS=listaEBS[id_maquina];
  var numeroS3=listaS3[id_maquina];

  //console.log("Valores das listas ec2: "+numeroEC2);
    //console.log("Valores das listas ebs: "+numeroEBS);
    //console.log("Valores das listas s3: "+numeroS3);    

  fetch(`http://localhost:3000/leituras/pdfzao/${numeroEC2}/${numeroEBS}/${numeroS3}`, { cache: "no-store" })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          //console.log(`vc retorna algo?`+resposta)
          //console.log("EFETUOU A FUNÇÃO INTEIRA")
          
        });
        
      } else {
        console.error("Nenhum dado encontrado ou erro na leituras");
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}