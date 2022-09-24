const mg = require('mailgun-js');
const mailgun = () => mg({
    apiKey: process.env.API_KEY,
    domain: process.env.DOMIAN,
});
const mail = (email, otp) => {
    mailgun().messages().send(
        {
            from: process.env.USER,
            to: email,
            subject: `Hello`,
            html: `<p>${otp}</p>`,
        },
        (error, body) => {
            if (error) {
                console.log(error);
                console.log('Error in sending email');
            } else {
                // console.log(body);
                console.log('Email sent successfully');
            }
        }
    );
}
module.exports = mail