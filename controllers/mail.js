var nodemailer = require("nodemailer");

module.exports = function (app) {
    app.post('/', function (req, res) {
        req.assert('name').notEmpty();
        req.assert('from').notEmpty();
        req.assert('message').notEmpty();

        var validationErrors = req.validationErrors();

        if (validationErrors) {
            res.status(400).json(validationErrors);
        }

        var authUser = process.env.AUTH_USER;
        var authPassword = process.env.AUTH_PASSWORD;

        var name = req.body.name;
        var from = req.body.from;
        var message = req.body.message;
        var to = process.env.TO_EMAIL;

        var poolConfig = 'smtp://' + authUser + ':' + authPassword + '@smtp.gmail.com/?pool=true';

        var smtpTransport = nodemailer.createTransport(poolConfig, {
            service: "Gmail"
        });

        var mailOptions = {
            from: from,
            to: to,
            subject: 'Node Mail Sender (' + name + ') | (' + from + ')',
            text: message
        }

        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
                res.status(400).json(error);
            } else {
                console.log('E-mail from ' + from + ' sent with success!');
                res.status(200).json(response);
            }
        });
    });
}