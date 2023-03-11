import nodeMailer from "nodemailer";
<<<<<<< HEAD

=======
>>>>>>> 57aaaa0f72c8200eebda9791c5ce785c6d64e485
const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      console.log(error);
    }
  });
};

export default sendEmail;
