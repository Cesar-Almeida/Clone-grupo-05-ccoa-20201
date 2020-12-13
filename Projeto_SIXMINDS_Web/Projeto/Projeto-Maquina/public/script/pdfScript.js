
function criarPDF(id_maquina){
    fetch(`http://localhost:3000/leituras/pdfzao/${id_maquina}`, { cache: "no-store" })
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (resposta) {
            console.log("EFETUOU A FUNÇÃO INTEIRA")
          });
          
        } else {
          console.error("Nenhum dado encontrado ou erro na leituras");
        }
      })
      .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });
  
  }