import ENV from "../config.js";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";

// Create a transporter object with your Gmail account details
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: ENV.EMAIL,
    pass: ENV.PASSWORD,
  },
});
// Create a mailgen instance
const mailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "My App",
    link: "https://myapp.com/",
  },
});
export const registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;
  //body of the email
  const email = {
    body: {
      name: username,
      intro: text || "Your OTP is:",
      outro: "If you did not request this OTP, please ignore this email.",
    },
  };
  var emailBody = mailGenerator.generate(email);
  let message = {
    from: ENV.EMAIL,
    to: userEmail,
    subject: subject || "Your OTP for Your Signup",
    html: emailBody,
  };
  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      console.log("Email sent: " + info.response);
      res.send({ msg: `Success: OTP sent to ${userEmail}` });
    }
  });
};
