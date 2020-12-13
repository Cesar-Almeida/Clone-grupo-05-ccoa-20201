var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Leitura = require('../models').Leitura;

/* Recuperar as últimas N leituras */
router.get('/ultimas', function(req, res, next) {
	
	// quantas são as últimas leituras que quer? 8 está bom?
	const limite_linhas = 7;

	console.log(`Recuperando as últimas ${limite_linhas} leituras`);
	
	const instrucaoSql = `select top ${limite_linhas} 
						IdEventos,
						GrauLum, 
						DataEvento,
						FORMAT(DataEvento,'HH:mm:ss') as momento_grafico
						from Eventos order by IdEventos desc`;

	sequelize.query(instrucaoSql, {
		model: Leitura,
		mapToModel: true 
	  })
	  .then(resultado => {
			console.log(`Encontrados: ${resultado.length}`);
			res.json(resultado);
	  }).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
	  });
});


// tempo real (último valor de cada leitura)
router.get('/tempo-real', function (req, res, next) {
	
	console.log(`Recuperando a última leitura`);

	const instrucaoSql = `select temperatura as temp, umidade as umid from [dbo].[DadosAr] as a where a.idDadosAr in (select max(b.idDadosAr) from [dbo].[DadosAr] as b group by b.fkSensor) order by a.fkSensor;`;

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});
  
});
router.get('/tempo-real1', function (req, res, next) {
	
	console.log(`Recuperando a última leitura`);

	const instrucaoSql = `select temperatura as temp, umidade as umid from [dbo].[DadosSolo] as a where a.idDadosSolo in (select max(b.idDadosSolo) from [dbo].[DadosSolo] as b group by b.fkSensor) order by a.fkSensor;`;

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});
  
});


// estatísticas (max, min, média, mediana, quartis etc)

router.get('/estatisticas', function (req, res, next) {
	
	console.log(`Recuperando as estatísticas atuais`);

	const instrucaoSql = `select temperatura as temp, umidade as umidade from [dbo].[DadosAr] as a where a.idDadosAr in (select max(b.idDadosAr) from [dbo].[DadosAr] as b group by b.fkSensor) order by a.fkSensor;`;
	
	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});
  
});
router.get('/estatisticas2', function (req, res, next) {
	
	console.log(`Recuperando as estatísticas atuais`);

	const instrucaoSql = `select temperatura as temp, umidade as umidade from [dbo].[DadosSolo] as a where a.idDadosSolo in (select max(b.idDadosSolo) from [dbo].[DadosSolo] as b group by b.fkSensor) order by a.fkSensor;`;
	
	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});
  
});
//---GRAFICO PARA ATM
router.get('/graficosao1', function (req, res, next) {
	
	console.log(`Recuperando as estatísticas atuais`);

	const instrucaoSql = `select datepart(month,dadoTempo) as mes,avg(temperatura) as med_temp, avg(umidade) as med_umid from [dbo].[DadosAr] group by datepart(month,dadoTempo);`;
	
	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});
  
});

module.exports = router;
