const jwt = require("jsonwebtoken");
const User = require("../model/user");

const verifyLogin = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.send({
        status: "fail",
        data: {
          login:
            "Cannot access the content that you are looking for! Please login to Continue",
        },
      });
    }

    const user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    const result = await User.findById(user._id);
    req.user = result;
    next();
  } catch (ex) {
    console.log(ex);
    return res.send({ status: "error", message: "Access Denied" });
  }
};

module.exports = { verifyLogin };
