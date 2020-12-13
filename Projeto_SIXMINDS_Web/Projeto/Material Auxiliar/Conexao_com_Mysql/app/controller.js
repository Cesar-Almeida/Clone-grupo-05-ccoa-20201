const express = require('express');
// const { ArduinoDataTemp } = require('./newserial')
const db = require('./database')
const router = express.Router();

let jason={};

console.log('Chegou onde eu qr');

router.get('/', (request, response, next) => {
    response.send("Funcionou");
});

router.get('/sendData', (request, response) => {
    var sql = "SELECT * FROM Usuario";
    
    db.query(sql,function(err, result) {
        if (err) throw err;
        response.json(result);
    });
   
});
router.get('/recebermaquinas', (request, response) => {
    var sql = "SELECT * FROM Maquina";
    
    db.query(sql,function(err, result) {
        if (err) throw err;
        response.json(result);
    });
   
});
router.get('/recebercomponentes', (request, response) => {
    var sql = "SELECT * FROM Componente";
    
    db.query(sql,function(err, result) {
        if (err) throw err;
        response.json(result);
    });
   
});

router.post('/enviar/:maquina/:componente/:ativado', (request, response) => {
    let maquina = request.params.maquina;
	let componente = request.params.componente;
	let ativado = request.params.ativado;
    var sql = `update maquinacomponente set ativado = ${ativado}
	where fkmaquina = ${maquina} and fkcomponente= '${componente}'; `;
    
    db.query(sql,function(err, result) {
        if (err) throw err;
        response.json(result);
    });
   
});

router.post('/criar/:maquina/:componente/:ativado', (request, response) => {
    let maquina = request.params.maquina;
	let componente = request.params.componente;
	let ativado = request.params.ativado;
    var sql = `insert into maquinacomponente(fkMaquina,fkComponente,ativado) values 
    (${maquina},${componente},${ativado}); `;
    
    db.query(sql,function(err, result) {
        if (err) throw err;
        response.json(result);
    });
   
});

module.exports = router;

