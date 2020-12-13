const express = require('express');
const { Request } = require('tedious');
// const { ArduinoDataTemp } = require('./newserial')
const db = require('./database')
const router = express.Router();

let jason = {};

console.log('Chegou onde eu qr');
console.log(`

    ░░░░░░░░░░░░░░░░░░░░░▄▀░░▌
    ░░░░░░░░░░░░░░░░░░░▄▀▐░░░▌
    ░░░░░░░░░░░░░░░░▄▀▀▒▐▒░░░▌
    ░░░░░▄▀▀▄░░░▄▄▀▀▒▒▒▒▌▒▒░░▌
    ░░░░▐▒░░░▀▄▀▒▒▒▒▒▒▒▒▒▒▒▒▒█
    ░░░░▌▒░░░░▒▀▄▒▒▒▒▒▒▒▒▒▒▒▒▒▀▄
    ░░░░▐▒░░░░░▒▒▒▒▒▒▒▒▒▌▒▐▒▒▒▒▒▀▄
    ░░░░▌▀▄░░▒▒▒▒▒▒▒▒▐▒▒▒▌▒▌▒▄▄▒▒▐
    ░░░▌▌▒▒▀▒▒▒▒▒▒▒▒▒▒▐▒▒▒▒▒█▄█▌▒▒▌
    ░▄▀▒▐▒▒▒▒▒▒▒▒▒▒▒▄▀█▌▒▒▒▒▒▀▀▒▒▐░░░▄
    ▀▒▒▒▒▌▒▒▒▒▒▒▒▄▒▐███▌▄▒▒▒▒▒▒▒▄▀▀▀▀
    ▒▒▒▒▒▐▒▒▒▒▒▄▀▒▒▒▀▀▀▒▒▒▒▄█▀░░▒▌▀▀▄▄
    ▒▒▒▒▒▒█▒▄▄▀▒▒▒▒▒▒▒▒▒▒▒░░▐▒▀▄▀▄░░░░▀
    ▒▒▒▒▒▒▒█▒▒▒▒▒▒▒▒▒▄▒▒▒▒▄▀▒▒▒▌░░▀▄
    ▒▒▒▒▒▒▒▒▀▄▒▒▒▒▒▒▒▒▀▀▀▀▒▒▒▄▀
`);

// console.log(`

  
//     ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░
//     ▒▒▒▒▒   ▐███▀▀▀▀▀▀▀██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░
//     ▒▒▒▒   ▐███▌▒▒▒▒▒▒▒▒    ▒▒░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░
//     ▒▒▒▒  ▐███▌▒▒▒▒▒▒▒▒▒▒▒░░▒░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
//     ▒▒▒   ▐███▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
//     ▒▒▒▒  ████████████▒▒▒▒▒▒▒▒▒▒░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░
//     ▒▒▒▒ ▐██▒▒▒▒▒▒▒▒███▌▒░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░
//     ▒▒▒▒ ███▒▒▒▒▒▒▒▐███▌▒░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░
//     ▒▒▒▒▒▐███▌▒▒▒▒▒▒▒███▌▒░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░
//     ▒▒▒▒▒▒▐███████████▌░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
//     ▒▒▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
//     ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░

// `);

router.get('/', (request, response, next) => {
    response.send("Funcionou");
});

router.get('/sendData', (request, response) => {
    var sql = "SELECT * FROM Usuario";

    db.query(sql, function (err, result) {
        if (err) throw err;
        response.json(result);
    });

});
router.get('/recebermaquinas/:usuario_maquina', (request, response) => {
    let usuario_maquina = request.params.usuario_maquina;
    var sql = `SELECT * FROM Maquina where Usuario_idUsuario=${usuario_maquina}`;

    db.query(sql, function (err, result) {
        if (err) throw err;
        response.json(result);
    });

});
router.get('/recebercomponentes', (request, response) => {
    var sql = "SELECT * FROM Componente";

    db.query(sql, function (err, result) {
        if (err) throw err;
        response.json(result);
    });

});

router.get('/recebercomponentesCPU', (request, response) => {
    var sql = "SELECT * FROM Componente where nomecomponente like 'CPU%'";

    db.query(sql, function (err, result) {
        if (err) throw err;
        response.json(result);
    });

});
router.get('/recebercomponentesMem', (request, response) => {
    var sql = "SELECT * FROM Componente where nomecomponente like 'Memoria%'";

    db.query(sql, function (err, result) {
        if (err) throw err;
        response.json(result);
    });

});
router.get('/recebercomponentesDisco', (request, response) => {
    var sql = "SELECT * FROM Componente where nomecomponente like 'Disco%'";

    db.query(sql, function (err, result) {
        if (err) throw err;
        response.json(result);
    });

});

router.get('/pegarumaleituradetemperatura', (request, response) => {
    var sql = 'select Leitura.idLeitura, Maquina.tipoMaquina, Leitura.descricao, Leitura.valor, Componente.metrica from Maquina, Leitura, Componente, MaquinaComponente where fkComponente = idComponente and idMaquina = fkMaquina and fkMaquinaComponente = idMaquinaComponente and idMaquina=3 and descricao like "Core %" and metrica="°C" order by idLeitura desc  limit 1; ';

    db.query(sql, function (err, result) {
        if (err) throw err;
        response.json(result);
    });

});

router.post('/enviar/:maquina/:componente/:ativado/:minimo/:maximo', (request, response) => {
    let maquina = request.params.maquina;
    let componente = request.params.componente;
    let ativado = request.params.ativado;
    let minimo = request.params.minimo;
    let maximo = request.params.maximo;
    var sql = `update MaquinaComponente set ativado = ${ativado},minimo=${minimo},maximo=${maximo}
	where fkMaquina = ${maquina} and fkComponente= '${componente}'; `;

    db.query(sql, function (err, result) {
        if (err) throw err;
        response.json(result);
    });

});
router.get('/receber/:maquina/:componente', (request, response) => {
    let maquina = request.params.maquina;
    let componente = request.params.componente;

    var sql = `select ativado,minimo,maximo,metrica
     from MaquinaComponente,Componente 
     where fkComponente=idComponente and fkMaquina=${maquina} and fkComponente=${componente} ; `;

    db.query(sql, function (err, result) {
        if (err) throw err;
        response.json(result);
    });

});

router.post('/criar/:maquina/:componente/:ativado/:minimo/:maximo', (request, response) => {
    let maquina = request.params.maquina;
    let componente = request.params.componente;
    let ativado = request.params.ativado;
    let minimo = request.params.minimo;
    let maximo = request.params.maximo;
    var sql = `insert into MaquinaComponente(fkMaquina,fkComponente,ativado,minimo,maximo) values 
    (${maquina},${componente},${ativado},${minimo},${maximo}); `;

    db.query(sql, function (err, result) {
        if (err) throw err;
        response.json(result);
    });

});

router.get('/numCore', (request, response) => {
    var sql = `select count(distinct descricao) as NumCore from Leitura where descricao like "Core %_uso" ;`;
    db.query(sql, function (err, result) {
        if (err) throw err;
        response.json(result);
    });
});



router.get('/dadosCore/:numCore/:maquina_atual/:componente', (request, response) => {
    var numCore = request.params.numCore;
    var maquina_atual = request.params.maquina_atual;
    var componente = request.params.componente;
    var sql = `select Leitura.valor, CAST(tempoLeitura AS TIME) as hora,MaquinaComponente.minimo,MaquinaComponente.maximo,Componente.metrica,MaquinaComponente.ativado  from Maquina, Leitura, Componente, MaquinaComponente where fkComponente = idComponente and idMaquina = fkMaquina and fkMaquinaComponente = idMaquinaComponente and idMaquina= ${maquina_atual} and descricao like "Core ${numCore}%" and idComponente = "${componente}" order by idLeitura desc limit 10;`;

    db.query(sql, function (err, result) {
        if (err) throw err;
        response.json(result);
    });
});

router.get('/dadosCoreComponente/:numCore/:maquina_atual/:componente', (request, response) => {
    var numCore = request.params.numCore;
    var maquina_atual = request.params.maquina_atual;
    var componente = request.params.componente;
    var sql = `select Leitura.valor,MaquinaComponente.minimo,MaquinaComponente.maximo,Componente.metrica,MaquinaComponente.ativado  from Maquina, Leitura, Componente, MaquinaComponente where fkComponente = idComponente and idMaquina = fkMaquina and fkMaquinaComponente = idMaquinaComponente and idMaquina= ${maquina_atual} and descricao like "Core %" and idComponente = "${componente}" order by idLeitura desc limit ${10 * numCore};`;

    db.query(sql, function (err, result) {
        if (err) throw err;
        response.json(result);
    });
});


router.get('/dadosDiscoTemp/:maquina_atual/:componente', (request, response) => {
    var maquina_atual = request.params.maquina_atual;
    var componente = request.params.componente;
    var sql = `select Leitura.valor as valorDiscoTemp, CAST(tempoLeitura AS TIME) as hora,metrica,ativado,maximo,minimo from Maquina, Leitura, Componente, MaquinaComponente where fkComponente = idComponente and idMaquina = fkMaquina and fkMaquinaComponente = idMaquinaComponente and idMaquina= ${maquina_atual} and descricao like "Disco%"and idComponente = "${componente}" order by idLeitura desc limit 10;`;

    db.query(sql, function (err, result) {
        if (err) throw err;
        response.json(result);
    });

});

router.get('/dadosDiscoPerc/:maquina_atual', (request, response) => {
    var maquina_atual = request.params.maquina_atual;
    var sql = `select Leitura.valor as valorDiscoUsoPorc, CAST(tempoLeitura AS TIME) as hora from Maquina, Leitura, Componente, MaquinaComponente where fkComponente = idComponente and idMaquina = fkMaquina and fkMaquinaComponente = idMaquinaComponente and idMaquina= ${maquina_atual} and descricao = "Disco uso %"and metrica = "%"  order by idLeitura desc limit 10;`;

    db.query(sql, function (err, result) {
        if (err) throw err;
        response.json(result);
    });

});

router.get('/dadosMemoriaUsoPerc/:maquina_atual/:componente', (request, response) => {
    var componente = request.params.componente;
    var maquina_atual = request.params.maquina_atual;
    var sql = `select Leitura.valor, CAST(tempoLeitura AS TIME) as hora,metrica,ativado,minimo,maximo from Maquina, Leitura, Componente, MaquinaComponente where fkComponente = idComponente and idMaquina = fkMaquina and fkMaquinaComponente = idMaquinaComponente and idMaquina=${maquina_atual} and descricao like "Memoria%"and idComponente = "${componente}" order by idLeitura desc limit  10;`;
    db.query(sql, function (err, result) {
        if (err) throw err;
        response.json(result);
    });

});

router.get('/dadosMemoriaUsoGB', (request, response) => {
    var sql = 'select Leitura.valor as valormemoriaGB, CAST(tempoLeitura AS TIME) as hora from Maquina, Leitura, Componente, MaquinaComponente where fkComponente = idComponente and idMaquina = fkMaquina and fkMaquinaComponente = idMaquinaComponente and idMaquina=3 and descricao = "Memoria uso GB"and metrica = "GB" order by idLeitura desc limit 10;';

    db.query(sql, function (err, result) {
        if (err) throw err;
        response.json(result);
    });

});

router.get('/dadosdeCadaComp/:idMaquina/:numCore', (request, response) => {
    let idMaquina = request.params.idMaquina;
    let numCore = request.params.numCore;

    
    
    var contadorSql=`select count(distinct(descricao)) as contador from Leitura,MaquinaComponente,Componente where fkMaquina=${idMaquina} and metrica="%" and fkMaquinaComponente=idMaquinaComponente and idComponente=fkComponente;`;
    
    db.query(contadorSql,function(err,result){
        
        var resultadoContador1=result[0].contador;
        var sql = `select idMaquina,tipoMaquina,nomeComponente,metrica,valor,minimo,maximo from Maquina, MaquinaComponente,Componente,Leitura where idMaquina=fkMaquina and idComponente=fkComponente
        and metrica="%" and idMaquina=${idMaquina} and idMaquinaComponente=fkMaquinaComponente order by idLeitura desc limit ${resultadoContador1}; `;
        db.query(sql, function (err, result1) {
            if (err) throw err;  
            //console.log("zika "+ result1);
            console.log(result1);
            response.json(result1);
        });
    });
   
});

router.get('/forecastMeses/:fkMaquina', (request, response) => {
    let fkMaquina = request.params.fkMaquina;

    var sql = `select monthname(tempoLeitura) as mes, count(distinct(tempoLeitura)) as tempoDistintos from Leitura,MaquinaComponente where idmaquinacomponente=fkmaquinacomponente and fkmaquina=${fkMaquina} group by MONTH(tempoLeitura);
    `;

    db.query(sql, function (err, result) {
        if (err) throw err;
        response.json(result);
    });
});

router.get('/requireProgressao/:meses/:valores', (request, response) => {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAA");
    let meses = request.params.meses;
    let valores = request.params.valores;

    let eixoX = [];
    let eixoY = [];


    let novavalores = [];
    let valor = valores.split(",");
    for (k in valor) {

        valor[k] = Number(parseFloat(valor[k]));
        console.log(k + "fds"+ valor[k]);

        novavalores.push(valor[k]);
    }

    let novames = [];
    for (c in meses) {
        if (meses[c] != ",") {
            novames.push(Number([parseInt(meses[c])]));
        }
    }

    for (n = 0; n <= novames.length - 1; n++) {
        let listaTemporariaX = [novames[n]];
        // console.log("meses N " + novameslista[n]);
        eixoX.push(listaTemporariaX);
        
        let listaTemporariaY = [novavalores[n]];
        
        eixoY.push(listaTemporariaY);
        
    }
    const rls = require("ml-regression-multivariate-linear");
    

    let regressao = new rls(eixoX, eixoY);
    // console.log(regressao);
    // console.log("PREDICT: " +  regressao.predict([eixoX.length]));

    response.json(regressao.predict([eixoX.length]));
});

// router.get('/autenticar', (request, response) => {
//     console.log('Recuperando usuário por login e senha');

// 	var login = request.params.login
//     var senha = request.params.senha;
    
// // var sql =  `select * from usuario where email= '${login}' and senha='${senha}`;

// //     db.query(sql, function (err, result) {
// //         if (err) throw err;
// //         response.json(result);
// //     });


//     res.redirect("/DashMaquina.html")

// });

router.get('/pdfzao/:ec2/:ebs/:s3', (request, response) => {
    //console.log("entra no scriptzada do pdf")

    let pdf=require("html-pdf");
    let numEc2=request.params.ec2;
    let numEbs=request.params.ebs;
    let numS3=request.params.s3;
    let soma=(Number(numEc2)+Number(numEbs)+Number(numS3)).toFixed(2);

    //console.log("Valores ec2: "+numEc2);
    //console.log("Valores ebs: "+numEbs);
    //console.log("Valores s3: "+numS3);
    //console.log("Valores soma: "+soma);
    // Valores aleátórios de código do boleto
    let random3=parseInt(Math.random()*(999 - 100))+100;
    let random1 = parseInt(Math.random() * 10);

    // Datas
    now = new Date;    
    let dataProcessamento =  `${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}`;
    let dataVencimento = `${now.getDate() + 10}/${now.getMonth()+1}/${now.getFullYear()}`;

    let conteudo = ``;
    conteudo=`
    <body>
    <style>
        body {
            font-family: "Arial";
        }

        @media print {
            .no-print,
            .no-print * {
                display: block !important;
            }
        }

        .document {
            margin: auto auto;
            width: 205mm;
            height: 108mm;
            background-color: #fff;
        }

        .headerBtn {
            margin: auto auto;
            width: 216mm;
            background-color: #fff;
            display: block;
        }

        table {
            width: 100%;
            position: relative;
            border-collapse: collapse;
        }

        .bankLogo {
            width: 28%;
        }

        .boletoNumber {
            width: 62%;
            font-weight: bold;
        }

        .center {
            text-align: center;
        }

        .right {
            text-align: right;
            right: 20px;
        }

        td {
            position: relative;
        }

        .title {
            position: absolute;
            left: 0px;
            top: 0px;
            font-size: 12px;
            font-weight: bold;
        }

        .text {
            font-size: 12px;
        }

        p.content {
            padding: 0px;
            width: 100%;
            margin: 0px;
            font-size: 12px;
        }

        .sideBorders {
            border-left: 1px solid black;
            border-right: 1px solid black;
        }

        hr {
            size: 1;
            border: 1px dashed;
        }

        br {
            content: " ";
            display: block;
            margin: 12px 0;
            line-height: 12px;
        }

        .print {
            /* TODO(dbeam): reconcile this with overlay.css' .default-button. */
            background-color: rgb(77, 144, 254);
            background-image: linear-gradient(to bottom, rgb(77, 144, 254), rgb(71, 135, 237));
            border: 1px solid rgb(48, 121, 237);
            color: #fff;
            text-shadow: 0 1px rgba(0, 0, 0, 0.1);
        }

        .btnDefault {
            font-kerning: none;
            font-weight: bold;
        }

        .btnDefault:not(:focus):not(:disabled) {
            border-color: #808080;
        }

        button {
            border: 1px;
            padding: 5px;
            line-height: 20px;
        }


    
    i[class*=icss-]{position:relative;display:inline-block;font-style:normal;background-color:currentColor;-webkit-box-sizing:border-box;box-sizing:border-box;vertical-align:middle}i[class*=icss-]:after,i[class*=icss-]:before{content:"";border-width:0;position:absolute;-webkit-box-sizing:border-box;box-sizing:border-box}i.icss-print{width:.68em;height:1em;border-style:solid;border-color:currentcolor;border-width:.07em;-webkit-border-radius:.05em;border-radius:.05em;background-color:transparent;margin:0 .17em}i.icss-print:before{width:1em;height:.4em;border-width:.07em .21em 0;border-style:solid;border-color:currentColor currentcolor transparent;-webkit-border-radius:.05em .05em 0 0;border-radius:.05em .05em 0 0;top:.25em;left:50%;-webkit-transform:translateX(-50%);-ms-transform:translateX(-50%);transform:translateX(-50%);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(20%,transparent),color-stop(20%,currentcolor),color-stop(60%,currentcolor),color-stop(60%,transparent));background-image:-webkit-linear-gradient(transparent 20%,currentcolor 20%,currentcolor 60%,transparent 60%);background-image:-o-linear-gradient(transparent 20%,currentcolor 20%,currentcolor 60%,transparent 60%);background-image:linear-gradient(transparent 20%,currentcolor 20%,currentcolor 60%,transparent 60%)}i.icss-print:after{width:.45em;height:.065em;background-color:currentColor;left:50%;-webkit-transform:translateX(-50%);-ms-transform:translateX(-50%);transform:translateX(-50%);top:.6em;-webkit-box-shadow:0 .12em,-.1em -.28em 0 .05em;box-shadow:0 .12em,-.1em -.28em 0 .05em}i.icss-files{width:.75em;height:.95em;background-color:transparent;border:.05em solid transparent;border-width:0 .05em .05em 0;-webkit-box-shadow:inset 0 0 0 .065em,.13em .11em 0 -.05em;box-shadow:inset 0 0 0 .065em,.13em .11em 0 -.05em;-webkit-border-radius:0 .3em 0 0;border-radius:0 .3em 0 0;margin:0 .17em .05em .1em}i.icss-files:before{border-style:solid;border-width:.2em;top:.037em;left:.25em;-webkit-border-radius:.1em;border-radius:.1em;border-color:transparent currentColor transparent transparent;-webkit-transform:rotate(-45deg);-ms-transform:rotate(-45deg);transform:rotate(-45deg)}
        </style>
    <br/>
    <div class="document">
        <table cellspacing="0" cellpadding="0">
            <tr class="topLine">
                <td class="bankLogo">
                    <img src="http://localhost:3000/img/logo3.png" style="width: 200px;">
                </td>
                <td class="sideBorders center"><span style="font-size:24px;font-weight:bold;">${random3}-${random1}</span></td>
                <td class="boletoNumber center"><span>34191.12345 67890.101112 13141.516171 8 12345678901112</span></td>
            </tr>
        </table>
        <table cellspacing="0" cellpadding="0" border="1">
            <tr>
                <td width="70%" colspan="6">
                    <span class="title">Local de Pagamento</span>
                    <br/>
                    <span class="text">ATÉ O VENCIMENTO EM QUALQUER BANCO OU CORRESPONDENTE NÃO BANCÁRIO, APÓS O VENCIMENTO, PAGUE EM QUALQUER BANCO OU CORRESPONDENTE NÃO BANCÁRIO</span>
                </td>
                <td width="30%">
                    <span class="title">Data de Vencimento</span>
                    <br/>
                    <br/>
                    <p class="content right text" style="font-weight:bold;">${dataVencimento}</p>
                </td>
            </tr>
            <tr>
                <td width="70%" colspan="6">
                    <span class="title">Nome do Beneficiário / CNPJ / CPF / Endereço:</span>
                    <br/>
                    <table border="0" style="border:none">
                        <tr>
                            <td width="60%"><span class="text">Simulação</span></td>
                            <td><span class="text">CNPJ 01.000.000/0001-00</span></td>
                        </tr>
                    </table>
                    <br/>
                    <span class="text">Rua Simulação, 1 - Jardim Simulação - São Paulo - SP - 10000-000</span>
                </td>
                <td width="30%">
                    <span class="title">Agência/Código Beneficiário</span>
                    <br/>
                    <br/>
                    <p class="content right">1234/12345-1</p>
                </td>
            </tr>

            <tr>
                <td width="15%">
                    <span class="title">Data do Documento</span>
                    <br/>
                    <p class="content center">${dataProcessamento}</p>
                </td>
                <td width="17%" colspan="2">
                    <span class="title">Num. do Documento</span>
                    <br/>
                    <p class="content center">1</p>
                </td>
                <td width="10%">
                    <span class="title">Espécie doc</span>
                    <br/>
                    <p class="content center">DM</p>
                </td>
                <td width="8%">
                    <span class="title">Aceite</span>
                    <br/>
                    <p class="content center">N</p>
                </td>
                <td>
                    <span class="title">Data Processamento</span>
                    <br/>
                    <p class="content center">${dataProcessamento}</p>
                </td>
                <td width="30%">
                    <span class="title">Carteira/Nosso Número</span>
                    <br/>
                    <br/>
                    <p class="content right">157/12345678-9</p>
                </td>
            </tr>

            <tr>
                <td width="15%">
                    <span class="title">Uso do Banco</span>
                    <br/>
                    <p class="content center">&nbsp;</p>
                </td>
                <td width="10%">
                    <span class="title">Carteira</span>
                    <br/>
                    <p class="content center">157</p>
                </td>
                <td width="10%">
                    <span class="title">Espécie</span>
                    <br/>
                    <p class="content center">$</p>
                </td>
                <td width="8%" colspan="2">
                    <span class="title">Quantidade</span>
                    <br/>
                    <p class="content center">N</p>
                </td>
                <td>
                    <span class="title">Valor</span>
                    <br/>
                    <p class="content center">$${soma}</p>
                </td>
                <td width="30%">
                    <span class="title">EC2</span>
                    <br/>
                    <br/>
                    <p class="content right">$${numEc2}</p>
                </td>
            </tr>
            <tr>
                <td colspan="6" rowspan="4">
                    <span class="title">Instruções de responsabilidade do BENEFICIÁRIO. Qualquer dúvida sobre este boleto contate o beneficiário.</span>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="title">EBS</span>
                    <br/>
                    <p class="content right">$${numEbs}</p>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="title">S3</span>
                    <br/>
                    <p class="content right">$${numS3}</p>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="title">TOTAL</span>
                    <br/>
                    <p class="content right">$${soma}</p>
                </td>
            </tr>
            <tr>
                <td colspan="7">
                    <table border="0" style="border:none">
                        <tr>
                            <td width="60%"><span class="text"><b>Nome do Pagador: </b> Pagador ABC</span></td>
                            <td><span class="text"><b>CNPJ/CPF: </b> 123.121.001-00</span></td>
                        </tr>
                        <tr>
                            <td><span class="text"><b>Endereço: </b> Avenida Brasil 1234 - Jardim Brasil - São Paulo - SP - 9999999-999</span></td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td><span class="text"><b>Sacador/Avalista: </b> &nbsp;</span></td>
                            <td><span class="text"><b>CNPJ/CPF: </b> &nbsp;</span></td>
                        </tr>
                    </table>

                </td>

            </tr>
        </table>
    </div>
    <div class="document">
        <hr/>
        <table cellspacing="0" cellpadding="0">
            <tr class="topLine">
                <td class="bankLogo">
                    <img src="http://localhost:3000/img/logo3.png" style="width: 200px;">
                </td>
                <td class="sideBorders center"><span style="font-size:24px;font-weight:bold;">${random3}-${random1}</span></td>
                <td class="boletoNumber center"><span>34191.12345 67890.101112 13141.516171 8 12345678901112</span></td>
            </tr>
        </table>
        <table cellspacing="0" cellpadding="0" border="1">
            <tr>
                <td width="70%" colspan="6">
                    <span class="title">Local de Pagamento</span>
                    <br/>
                    <span class="text">ATÉ O VENCIMENTO EM QUALQUER BANCO OU CORRESPONDENTE NÃO BANCÁRIO, APÓS O VENCIMENTO, PAGUE EM QUALQUER BANCO OU CORRESPONDENTE NÃO BANCÁRIO</span>
                </td>
                <td width="30%">
                    <span class="title">Data de Vencimento</span>
                    <br/>
                    <br/>
                    <p class="content right text" style="font-weight:bold;">${dataVencimento}</p>
                </td>
            </tr>
            <tr>
                <td width="70%" colspan="6">
                    <span class="title">Nome do Beneficiário / CNPJ / CPF / Endereço:</span>
                    <br/>
                    <table border="0" style="border:none">
                        <tr>
                            <td width="60%"><span class="text">Simulação</span></td>
                            <td><span class="text">CNPJ 01.000.000/0001-00</span></td>
                        </tr>
                    </table>
                    <br/>
                    <span class="text">Rua Simulação, 1 - Jardim Simulação - São Paulo - SP - 10000-000</span>
                </td>
                <td width="30%">
                    <span class="title">Agência/Código Beneficiário</span>
                    <br/>
                    <br/>
                    <p class="content right">1234/12345-1</p>
                </td>
            </tr>

            <tr>
                <td width="15%">
                    <span class="title">Data do Documento</span>
                    <br/>
                    <p class="content center">${dataProcessamento}</p>
                </td>
                <td width="17%" colspan="2">
                    <span class="title">Num. do Documento</span>
                    <br/>
                    <p class="content center">1</p>
                </td>
                <td width="10%">
                    <span class="title">Espécie doc</span>
                    <br/>
                    <p class="content center">DM</p>
                </td>
                <td width="8%">
                    <span class="title">Aceite</span>
                    <br/>
                    <p class="content center">N</p>
                </td>
                <td>
                    <span class="title">Data Processamento</span>
                    <br/>
                    <p class="content center">${dataProcessamento}</p>
                </td>
                <td width="30%">
                    <span class="title">Carteira/Nosso Número</span>
                    <br/>
                    <br/>
                    <p class="content right">157/12345678-9</p>
                </td>
            </tr>

            <tr>
                <td width="15%">
                    <span class="title">Uso do Banco</span>
                    <br/>
                    <p class="content center">&nbsp;</p>
                </td>
                <td width="10%">
                    <span class="title">Carteira</span>
                    <br/>
                    <p class="content center">157</p>
                </td>
                <td width="10%">
                    <span class="title">Espécie</span>
                    <br/>
                    <p class="content center">$</p>
                </td>
                <td width="8%" colspan="2">
                    <span class="title">Quantidade</span>
                    <br/>
                    <p class="content center">N</p>
                </td>
                <td>
                    <span class="title">Valor</span>
                    <br/>
                    <p class="content center">$${soma}</p>
                </td>
                <td width="30%">
                    <span class="title">EC2</span>
                    <br/>
                    <br/>
                    <p class="content right">$${numEc2}</p>
                </td>
            </tr>
            <tr>
                <td colspan="6" rowspan="4">
                    <span class="title">Instruções de responsabilidade do BENEFICIÁRIO. Qualquer dúvida sobre este boleto contate o beneficiário.</span>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="title">EBS</span>
                    <br/>
                    <p class="content right">$${numEbs}</p>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="title">S3</span>
                    <br/>
                    <p class="content right">$${numS3}</p>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="title">TOTAL</span>
                    <br/>
                    <p class="content right">$${soma}</p>
                </td>
            </tr>
            <tr>
                <td colspan="7">
                    <table border="0" style="border:none">
                        <tr>
                            <td width="60%"><span class="text"><b>Nome do Pagador: </b> Pagador ABC</span></td>
                            <td><span class="text"><b>CNPJ/CPF: </b> 123.121.001-00</span></td>
                        </tr>
                        <tr>
                            <td><span class="text"><b>Endereço: </b> Avenida Brasil 1234 - Jardim Brasil - São Paulo - SP - 9999999-999</span></td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td><span class="text"><b>Sacador/Avalista: </b> &nbsp;</span></td>
                            <td><span class="text"><b>CNPJ/CPF: </b> &nbsp;</span></td>
                        </tr>
                    </table>

                </td>

            </tr>
        </table>
        <br/>
        <img src="data:image/png;base64,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"
            alt="">
        <br/>
        <br/>
        <br/>
    </div>
</body>
    
    `
  
    pdf.create(conteudo,{}).toFile("public/boletoPDF.pdf",(err,res)=>{
        if(err){
            console.log("ocorreu um erro:");
            response.json("PDF nao criado");
        }
        else{
            console.log("TEORICAMENTE FOI E CRIOU")
            console.log(res);
            response.json("PDF criado");
        }
    });

    
  })
  

module.exports = router;
