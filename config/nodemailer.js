import nodemailer from "nodemailer";
import { EMAIL_PASS } from "./env.js";

export const USER_EMAIL = "harishij.exe@gmail.com";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: USER_EMAIL,
    pass: EMAIL_PASS,
  },
});

export default transporter;
