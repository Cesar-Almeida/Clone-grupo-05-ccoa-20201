var express = require('express');
var router = express.Router();


// const express = require('express');
// const { Request } = require('tedious');
// const { ArduinoDataTemp } = require('./newserial')
const db = require('./database')
// const router = express.Router();

const axios = require("axios");
const { Request } = require('tedious');
let url_bot = 'https://hooks.slack.com/services/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';

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/autenticar', (request, response) => {
  console.log('Recuperando usuário por login e senha');
  // response.send("funcionou");

  // var login = request.params.login
  // var senha = request.params.senha;


  var login = request.body.login;
  var senha = request.body.senha;


  // var login = "joao@joao.com";
  // var senha = "123";

  // response.send("foi");
  var sql = `SELECT * FROM Usuario WHERE email='${login}' AND senha='${senha}'`;

  db.query(sql, function (err, result) {
    if (err) throw err;
    // response.json(result);
    // response.send(result)
console.log(result)
    response.json(result[0])
  
    

  });


  // res.redirect("/DashMaquina.html")

});


router.post('/slack/:quem', function (req, res, next) {
  console.log(`Enviando menssagem slack`);
  console.log("ola senhores");

  var subject = req.body.input_subject;
  var email = req.body.input_email;
  var description = req.body.textarea_description;
  var quem = req.params.quem;
  var message = `${subject} \n\n ${description} \n\n Enviado por: ${email}`;
  send_message_slack(message);
  if (quem == 0) {
    res.redirect("/DashMaquina.html")
  } else {
    res.redirect("/dashGerente.html")
  }
  // res.location("http://pt.stackoverflow.com")
  // res.json()

})

function send_message_slack(message) {
  axios.post(
    url_bot,
    { text: message }
  )


}



/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
