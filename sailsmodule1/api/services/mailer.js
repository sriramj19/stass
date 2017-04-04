var _ = require('lodash');
module.exports = {
  sendMail : function(locals, bus_details) {
  const nodemailer = require('nodemailer');
  var emailIds = [];
  _.forEach(locals, function(value) {
    emailIds.push(value.emailId);
  });

  emailIds = [];
  emailIds = ['sriramemailsyou@gmail.com', 'sudansankar@gmail.com'];
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'secstass@gmail.com',
          pass: '5jfkindia'
      },
      tls: {
        rejectUnauthorized: false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Stass" <secstass@gmail.com>', // sender address
      to: emailIds, // list of receivers
      subject: 'Greetings from Stass', // Subject line
      text: 'Your bus, ' + bus_details.bus_route + ' is ' + bus_details.comments, // plain text body
      // html: '<b>This is a test message</b>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
  });
  return true;
}

};
