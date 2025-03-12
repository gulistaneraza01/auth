import dotenv from "dotenv";
dotenv.config();

const mongodbURI = process.env.MONGODB_URI;
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const isProduction = process.env.NODE_ENV === "production";
const smtpUserName = process.env.SMTP_USERNAME;
const smtpPassword = process.env.SMTP_PASSWORD;
const senderEmail = process.env.SENDER_EMAIL;

export {
  mongodbURI,
  jwtSecretKey,
  isProduction,
  smtpUserName,
  smtpPassword,
  senderEmail,
};
