const axios = require("axios");
let url_bot = 'https://hooks.slack.com/services/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';


module.exports = { 
    send_message_slack : function(subject, email, description) {
        var message = `${subject} \n\n ${description} \n\n Enviado por: ${email}`;

        axios.post(
            url_bot,
            { text: message }
        )
    }

}