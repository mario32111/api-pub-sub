const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports, 587 in false
  auth: {
    user: 'marioge44@gmail.com',
    pass: 'gzcn qqeo hngt dvtj'
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'marioge44@gmail.com', // sender address
    to: "benydic12@gmail.com", // list of receivers
    subject: "que onda2", // Subject line
    text: "alguien ahi?", // plain text body
    html: "<b>Kiuboooooooooooooooooooooooo</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

sendMail();
