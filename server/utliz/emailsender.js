import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ACCOUNT,
    pass: process.env.APP_PASSKEY,
  },
});

export const sendmail = async (to, subject, html) => {
  try {
    await transport.sendMail({
      from: process.env.GMAIL_ACCOUNT,
      to,
      subject,
      html,
    });
    console.log("Email sent successfully");
  } catch (err) {
    console.error(err);
  }
};
