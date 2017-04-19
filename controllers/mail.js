const nodemailer = require('nodemailer')

module.exports = app => {
  app.post('/', (req, res) => {
    req.assert('name').notEmpty();
    req.assert('from').notEmpty();
    req.assert('message').notEmpty();

    const validationErrors = req.validationErrors();

    if (validationErrors)
      res.status(400).json(validationErrors)

    const auth = {
      user: process.env.AUTH_USER,
      password: process.env.AUTH_PASSWORD
    }

    const poolConfig = `smtp://${auth.user}:${auth.password}@smtp.gmail.com/?pool=true`

    const smtpTransport = nodemailer.createTransport(poolConfig, {
      service: 'Gmail'
    })

    const mailOptions = {
      from: req.body.from,
      to: process.env.TO_EMAIL,
      subject: `Node Mail Sender (${req.body.name}) | (${req.body.from})`,
      text: req.body.message
    }

    smtpTransport.sendMail(mailOptions, (error, response) => {
      if (error) {
        console.log(error)
        res.status(400).json(error)
      } else {
        console.log(`E-mail from ${mailOptions.from} sent with success!`)
        res.status(200).json(response)
      }
    })
  })
}
