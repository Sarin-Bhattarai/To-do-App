//It handle all the errors and validations done and shows the meaningful error or success message
const { validationResult } = require("express-validator");
module.exports = function (req, res, next) {
  let allErrors = {};
  const { errors } = validationResult(req);
  if (errors.length < 1) {
    return next();
  }
  errors.forEach((error) => {
    allErrors[error.param] = error.msg;
  });
  console.log(allErrors);
  // next(new CustomError(allErrors, 400));
  return res.status(400).send({ status: "fail", data: allErrors });
};
