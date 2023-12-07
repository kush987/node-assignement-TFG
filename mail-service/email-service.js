const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '<your email>',
    pass: '<your password>'
  }
});

const sendWelcomeEmail = (toEmail, username) => {
  console.log(toEmail)
  const mailOptions = {
    from: '<your email>',
    to: toEmail,
    subject: 'Welcome to Game App',
    text: `Dear ${username},\n\nWelcome to App! We're glad to have you on board.\n\nBest regards,\nYour App Team`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending welcome email:', error);
    } else {
      console.log('Welcome email sent:', info.response);
    }
  });
};

module.exports = { sendWelcomeEmail };
