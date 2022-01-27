//This is the helper to send mail to the requested client to perform specified task like reset password tokens and so on.
const nodemailer = require("nodemailer");
class SendMail {
  constructor() {
    console.log(process.env.EMAIL, process.env.EMAIL_PASSWORD);
    this.transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  async sendMail(receiverMail, mailType, data) {
    try {
      await this.transporter.sendMail({
        from: `"Todo app" <${process.env.EMAIL}>`,
        to: receiverMail,
        subject:
          mailType === "pwReset"
            ? "Password Reset Email"
            : "User Verification Mail",
        text:
          mailType === "pwReset"
            ? "Password Reset Token"
            : "User Verification Token",
        html:
          mailType === "pwReset"
            ? "<p>Password Reset Token</p>" + data
            : "<p>User Verification Token</p>" + data,
      });
      return true;
    } catch (ex) {
      console.log(ex);
      return false;
    }
  }
}
const sendMail = new SendMail();
module.exports = sendMail;
