const User = require("../model/user");
const ResetToken = require("../model/resetToken");
const { generateRandomToken } = require("../helper/resetHelper");
const sendMail = require("../helper/email");
const bcrypt = require("bcrypt");

exports.emailSend = async (req, res) => {
  const data = await User.findOne({ email: req.body.email });
  console.log(data);

  if (data) {
    const token = generateRandomToken();
    let newToken = new ResetToken({
      email: req.body.email,
      token: token,
      expireIn: new Date().getTime() + 300 * 1000, //5 minutes (*1000 = converting into milliseconds)
    });
    let tokenResponse = await newToken.save();
    sendMail.sendMail(req.body.email, "pwReset", token);
    res.status(200).json({
      status: "Success",
      data: { email: req.body.email },
    });
  } else {
    res.status(400).json({
      status: "Error",
      message: "Email Id doesn't exist",
    });
  }
};
//sendMail.sendMail(email, "pwReset", token)

exports.resetPassword = async (req, res) => {
  const data = await ResetToken.findOne({
    email: req.body.email,
    token: req.body.token,
  });
  console.log(data);
  if (data) {
    let currentTime = new Date().getTime();
    let diff = data.expireIn - currentTime;
    if (diff < 0) {
      res.status(400).json({
        status: "Error",
        message: "Token Expire",
      });
    } else {
      const user = await User.findOne({ email: req.body.email });
      user.password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      user.save();
      res.status(200).json({
        status: "Success",
        data: { user: user },
      });
    }
  } else {
    res.status(400).json({
      status: "Error",
      message: "Invalid Token",
    });
  }
};
