import dayjs from "dayjs";
import { emailTemplates } from "./email.template.js";
import transporter, { USER_EMAIL } from "../config/nodemailer.js";

export const sendReminderEmail = async ({ to, type, subscription }) => {
  if (!to || !type) throw new Error("Missing required fields for sending email: to, type, subscription");

  const template = emailTemplates.find((template) => template.label === type);

  if (!template) throw new Error(`Template not found for type: ${type}`);

  const mailInfo = {
    userName: subscription.user.name,
    subscriptionName: subscription.name,
    renewalDate: dayjs(subscription.renewalDate).format("DD-MM-YYYY"),
    planName: subscription.name,
    price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
    paymentMethod: subscription.paymentMethod,
  };

  const message = template.generateBody(mailInfo);
  const subject = template.generateSubject(mailInfo);

  const mailOptions = {
    from: USER_EMAIL,
    to: to,
    subject: subject,
    html: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.error(error, "Error sending email");

    console.log("Email sent: " + info.response);
  });
};
