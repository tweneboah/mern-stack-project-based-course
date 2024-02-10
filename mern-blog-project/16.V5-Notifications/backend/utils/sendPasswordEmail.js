const nodemailer = require("nodemailer");

const sendPasswordEmail = async (to, token) => {
  try {
    //1. Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
    //create the message
    const message = {
      to,
      subject: "Password",
      html: `<p>You are receiving this email because you (or someone else) have requested the reset of a password.</p>
      <p>Please click on the following link, or paste this into your browser to complete the process:</p>
      <p>http://localhost:5173/reset-password/${token}</p>
      <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
      `,
    };
    //send the email
    const info = await transporter.sendMail(message);
    console.log("Email sent", info.messageId);
    return info;
  } catch (error) {
    console.log(error);
    throw new Error("Email sending failed");
  }
};

module.exports = sendPasswordEmail;
