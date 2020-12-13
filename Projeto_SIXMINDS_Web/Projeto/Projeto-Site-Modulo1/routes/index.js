var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/slack', function (req, res, next) {
var sendSlack = require("../public/sendSlack.js");

  console.log(`Enviando menssagem slack`);

  var subject = req.body.input_subject;
  var email = req.body.input_email;
  var description = req.body.textarea_description;

  sendSlack.send_message_slack(subject, email, description);

  res.redirect("/dashboard.html")
});

router.post('/sendEmail', function(req, res, next){
  var sendEmail = require("../public/sendEmail.js");

  console.log("Enviando Email de contato");
  
  var sender = req.body.first_name + req.body.last_name;  
  var subject = req.body.subject;
  var email = req.body.email;  
  var message = req.body.message;

  sendEmail.sendEmail(sender, email, subject, message);
  // sendEmail.sendEmail();

  res.redirect("/index.html")
});



module.exports = router;
