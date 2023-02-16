const { User } = require("../model/schemas/user");
const sendEmail = require("./sendEmail");

const { BASE_URL } = process.env;

const resendEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user.verify) {
    res.status(400).json({
      Status: " 400 Bad Request",
      "Content-Type": "application/json",
      ResponseBody: {
        message: "Verification has already been passed",
      },
    });
  }
  if (!user) {
    res.status(400).json({
      Status: " 400 Bad Request",
      "Content-Type": "application/json",
      ResponseBody: {
        message: "missing required field email",
      },
    });
  }

  const mail = {
    to: email,
    subject: "Please, confirm you email",
    html: `<a href="${BASE_URL}/api/users/verify/${user.verificationToken}">Confirm</>`,
  };
  await sendEmail(mail);
  res.status(200).json({
    Status: "200 Ok",
    "Content-Type": "application/json",
    ResponseBody: {
      message: "Verification email sent",
    },
  });
};

module.exports = resendEmail;
