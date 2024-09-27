const nodemailer = require("nodemailer");
const Transport = require("nodemailer-brevo-transport");

//transport
console.log("API_BREVO:", process.env.API_BREVO);
const transporter = nodemailer.createTransport(
  new Transport({
    auth: {
      apikey: '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'
      ,
    },
  })
);

const sendEmailController = (req, res) => {
  try {
    const { name, email, msg } = req.body;

    //validation
    if (!name || !email || !msg) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    //email matter
    transporter.sendMail({
      to: "info.nayan1323@gmail.com",
      from: "info.nayan1323@gmail.com",
      subject: "Regarding Mern Portfolio App",
      html: `
        <h5>Detail Information</h5>
        <ul>
          <li><p>Name : ${name}</p></li>
          <li><p>Email : ${email}</p></li>
          <li><p>Message : ${msg}</p></li>
        </ul>
      `,
    });

    return res.status(200).send({
      success: true,
      message: "Your Message Send Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Send Email API Error",
      error,
    });
  }
};

module.exports = { sendEmailController };
