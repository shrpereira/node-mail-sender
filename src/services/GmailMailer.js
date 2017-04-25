const Mailer = require('../services/Mailer.js');

module.exports = class GmailMailer extends Mailer {
    constructor(user, password) {
        const poolConfig = `smtp://${user}:${password}@smtp.gmail.com/?pool=true`;
        super(user, password, poolConfig);
    }
}
