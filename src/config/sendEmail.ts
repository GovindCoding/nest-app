// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require('nodemailer');
const SERVICE_FILE_NAME = 'SendEmail :: ';
// import constants from './constants.json';

function SendEmail(emailObj: any) {
  const SERVICE_NAME = 'sendEmail() :: ';
  console.info(SERVICE_FILE_NAME + SERVICE_NAME + 'Entering into sendEmail().');
  try {
    const emailSetup =
      'smtps://anka.testing@anka.co.in:@nkA73sting@smtp.gmail.com';
    // const emailSetup =
    //   'smtps://' +
    //   constants.EMAIL_USERNAME +
    //   ':' +
    //   constants.EMAIL_PASSWORD +
    //   '@' +
    //   constants.EMAIL_SMTP_HOST;
    const mailTransport = nodemailer.createTransport(emailSetup);

    const mailOptions: any = {
      from: `Support <anka.testing@anka.co.in>`,
      to: emailObj.email,
    };
    mailOptions.html = `<p>${emailObj.emailContent}</p>`;
    mailOptions.subject = emailObj.emailSubject;
    if (emailObj.attachments) {
      mailOptions.attachments = emailObj.attachments;
    }
    console.info(SERVICE_FILE_NAME + SERVICE_NAME + 'Email sent successfully.');
    return mailTransport.sendMail(mailOptions);
  } catch (error) {
    console.error(
      SERVICE_FILE_NAME + SERVICE_NAME + 'Error in Sending email. Error:',
      error,
    );
    return {
      status: 'ERROR',
      message: 'Error in Sending email',
    };
  }
}

export default SendEmail;
