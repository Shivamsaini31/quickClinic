const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        service: process.env.SMPT_SERVICE, // Should be 'gmail'
        auth: {
            user: process.env.SMPT_MAIL, // Your Gmail address
            pass: process.env.SMPT_PASSWORD // Your Gmail app password
        }
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    };
    try {
      await transporter.sendMail(mailOptions);
  } catch (error) {
      console.error("Failed to send email:", error); // Log the error
      throw new Error("Failed to send . Please try again later.");
  }
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
