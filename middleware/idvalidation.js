const { param } = require("express-validator");
const User = require("../model/user");

function validateUserId() {
  return [
    param("id").custom(async (value) => {
      const user = await User.findById(value);
      if (!user) {
        throw new Error("User not found");
      }
      return Promise.resolve();
    }),
  ];
}

module.exports = validateUserId;
