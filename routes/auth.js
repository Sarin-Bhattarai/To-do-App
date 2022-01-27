const express = require("express");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { loginUserValidation } = require("../validation/validation");
const handleError = require("../helper/handleError");
const { emailSend } = require("../middleware/auth");
const { resetPassword } = require("../middleware/auth");
const { tokenValidation } = require("../helper/tokenValidation");
const { emailValidation } = require("../helper/tokenValidation");

const router = express.Router();

//for login the users
router.post("/login", loginUserValidation(), handleError, async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json("User cannot be found");
    }
    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validatePassword) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_PRIVATE_KEY);
    res.header("x-auth-token", token).send(token);
  } catch (error) {
    return res.status(400).json({ status: "Error", message: error.message });
  }
});

router.post("/email-send", emailValidation(), handleError, emailSend);
router.post("/reset-password", tokenValidation(), handleError, resetPassword);

module.exports = router;
