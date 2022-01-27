const express = require("express");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const { registerUserValidation } = require("../validation/validation");
const handleError = require("../helper/handleError");

const router = express.Router();

//for registering the user
router.post(
  "/register",
  registerUserValidation(),
  handleError,
  async (req, res) => {
    const userDetails = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    };
    const salt = await bcrypt.genSalt(10);
    userDetails.password = await bcrypt.hash(userDetails.password, salt);
    //10 is a example of salt
    //A salt is random text added to the string to be hashed. For example, you don't hash my_secret_password;
    // you hash something like 1jfSLKe$*@SL$#)(Sslkfs$34:my_secret_password).
    try {
      User.find({ email: req.body.email }, async (error, user) => {
        if (error) {
          return res
            .status(400)
            .json({ status: "error", message: error.message });
        }
        if (user.length > 0) {
          res.status(500).send({
            status: "fail",
            data: { user: "User is already registered" },
          });
          return;
        } else {
          const user = new User(userDetails);
          const result = await user.save();
          return res.send({ status: "success", data: { user: user } });
        }
      });
    } catch (ex) {
      res.status(400).send({ status: "error", message: ex.message });
    }
  }
);

module.exports = router;
