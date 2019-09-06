var nodemailer = require('nodemailer');
module.exports = (req, res) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sendmailposmakanan96@gmail.com',
            pass: 'abogobogaA#'
        }
    });
    const mailOptions = {
        from: 'sendmailposmakanan96@gmail.com', // sender address
        to: req.body.email, // list of receivers
        subject: 'Transaksimu', // Subject line
        html: req.body.html// plain text body
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err){
            console.log(err)
        }
        else{
            console.log(info);
        }
    });
}
