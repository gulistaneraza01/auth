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
