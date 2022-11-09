const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendMailer() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'donkami4444@gmail.com',
      pass: 'zgveaqnttehbwklh'
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'donkami4444@gmail.com', // sender address
    to: "camilo.munerac@gmail.com", // list of receivers
    subject: "Este es un correo automatico ✔", // Subject line
    text: "Hola, yo no escribi este correo", // plain text body
    html: "<b>Hola, yo no escribi este correo</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

sendMailer();
