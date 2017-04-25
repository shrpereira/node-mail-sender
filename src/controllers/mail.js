const GmailMailer = require('../services/GmailMailer.js');

module.exports = app => {
    app.post('/', (req, res) => {
        req.assert('name', 'The input "name" is required').notEmpty();
        req.assert('from', 'The input "from" is required').notEmpty();
        req.assert('message', 'The input "message" is required').notEmpty();

        const validationErrors = req.validationErrors();

        if (validationErrors)
            res.status(400).json(validationErrors)

        const mailer = new GmailMailer(process.env.AUTH_USER, process.env.AUTH_PASSWORD);

        const from = req.body.from;
        const to = process.env.TO_EMAIL;
        const subject = `Node Mail Sender (${req.body.name}) | (${req.body.from})`;
        const message = req.body.message;

        mailer.sendMail(from, to, subject, message, (error, result) => {
            console.log(result);
            if (error) {
                console.log(error)
                res.status(400).json(error)
            } else {
                console.log(`E-mail from ${mailOptions.from} sent with success!`)
                res.status(200).json(result)
            }
        });
    })
}
