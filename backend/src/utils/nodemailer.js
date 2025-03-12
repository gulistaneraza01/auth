import nodemailer from "nodemailer";
import { smtpPassword, smtpUserName } from "./constaints.js";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: smtpUserName,
    pass: smtpPassword,
  },
});

export default transporter;

// async function main() {
//   const info = await transporter.sendMail({
//     from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
//     to: "bar@example.com, baz@example.com",
//     subject: "Hello ✔",
//     text: "Hello world?",
//     html: "<b>Hello world?</b>",
//   });

//   console.log("Message sent: %s", info.messageId);
// }

// main().catch(console.error);
