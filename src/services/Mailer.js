const nodemailer = require('nodemailer')

module.exports = class Mailer {
    constructor(user, password, poolConfig) {
        this.user = user;
        this.password = password;
        this.poolConfig = poolConfig;
    }

    sendMail(from, to, subject, message, callback) {
        const smtpTransport = nodemailer.createTransport(this.poolConfig);

        const mailOptions = {
            from: from,
            to: to,
            subject: subject,
            text: message
        }

        smtpTransport.sendMail(mailOptions, callback);
    }
}
