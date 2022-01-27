//Reset helper function to reset password.
const jwt = require("jsonwebtoken");
module.exports = {
  signJwt: (payload) => {
    return jwt.sign(payload, process.env.JWT_PRIVATE_KEY, {
      expiresIn: "15d",
    });
  },
  verifyJwt: (token) => {
    const payload = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    return payload;
  },
  generateRandomToken: () => {
    return Math.floor(100000 + Math.random() * 900000);
  },
};
