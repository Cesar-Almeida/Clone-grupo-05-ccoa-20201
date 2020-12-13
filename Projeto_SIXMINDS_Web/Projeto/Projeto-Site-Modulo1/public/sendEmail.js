const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp1.iagentesmtp.com.br",
  port: 587,
  secure: false,
  auth: {
    user: "carlos.santana@bandtec.com.br",
    pass: "c3f75b"}
});

module.exports = {
  
  sendEmail : function(sender, email, subject, message){  

    var mailOptions = {
      from: email,
      to: "eduardomarquesdesantana@gmail.com",
      subject: subject,
      html:`<h3>${sender}<h3> <p>${message}</p>`
    }
  
    console.log(mailOptions);
  
    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        console.log(error);
      }else {
        console.log("Email enviado: " + info.response);
      }
    });  
  }

}