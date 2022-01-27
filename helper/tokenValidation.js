const { body } = require("express-validator");

const tokenValidation = () => {
  return [
    body("email")
      .isEmail()
      .withMessage("Invalid Email")
      .isLength({ min: 5, max: 50 }),

    body("token").isLength({ min: 6, max: 6 }).withMessage(""),

    body("password")
      .isLength({ min: 5, max: 25 })
      .withMessage(
        "Password length must be minimum 5 character and maximum 25 character long"
      ),

    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
  ];
};

const emailValidation = () => {
  return [body("email").isEmail().withMessage("email must contain @")];
};

module.exports = {
  tokenValidation,
  emailValidation,
};
