const { body } = require("express-validator");

const registerUserValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("Not a valid name")
      .isLength({ min: 4 })
      .withMessage("Name must be at least 4 character long"),

    body("email")
      .isEmail()
      .withMessage("Invalid Email")
      .isLength({ min: 10, max: 50 }),

    body("password")
      .isLength({ min: 5, max: 25 })
      .withMessage(
        "Password length must be minimum 5 character and maximum 25 character long"
      ),
  ];
};

const loginUserValidation = () => {
  return [
    body("email")
      .isEmail()
      .withMessage("Invalid Email")
      .isLength({ min: 10, max: 50 }),

    body("password")
      .isLength({ min: 5, max: 25 })
      .withMessage(
        "Password length must be minimum 5 character and maximum 25 character long"
      ),
  ];
};

const todoValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("Not a valid name")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 character long"),

    body("message")
      .isString()
      .withMessage("Not a valid message")
      .isLength({ min: 5, max: 255 })
      .withMessage(
        "Message length must be at least minimum 5 character long and maximum 255 character long"
      ),
  ];
};

const edittodoValidation = () => {
  return [
    body("name")
      .optional()
      .isString()
      .withMessage("Not a valid name")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 character long"),

    body("message")
      .optional()
      .isString()
      .withMessage("Not a valid message")
      .isLength({ min: 5, max: 255 })
      .withMessage(
        "Message length must be at least minimum 5 character long and maximum 255 character long"
      ),
  ];
};

module.exports = {
  registerUserValidation,
  loginUserValidation,
  todoValidation,
  edittodoValidation,
};
