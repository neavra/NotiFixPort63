const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "notifi.port63@gmail.com",
    pass: "ljxxodfjvfkqntql",
  },
});

const sendEmail = async (to_address, subject, content) => {
  const mailOptions = {
    from: "notifi.port63@gmail.com",
    to: to_address,
    subject: subject,
    text: content,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return "Error";
    } else {
      console.log("Email sent: " + info.response);
      return "Success";
    }
  });
};

exports.sendEmail = sendEmail;
