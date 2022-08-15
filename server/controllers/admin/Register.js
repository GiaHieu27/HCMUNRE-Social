const User = require("../../models/User");
const bcrypt = require("bcrypt");
const { validateUserName } = require("../../helpers/validation");
const { sendVerificationEmail } = require("../../helpers/mailer");
const { generateToken } = require("../../helpers/tokens");

async function register(req, res) {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      bYear,
      bMonth,
      bDate,
      gender,
    } = req.body;

    const checkEmailUnique = await User.findOne({ email });
    if (checkEmailUnique) {
      return res
        .status(400)
        .json({ message: "Email đã được sử dụng! Vui lòng nhập email khác" });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);

    let tempUserName = `${first_name}${last_name}`;
    let newUserName = await validateUserName(tempUserName);

    const user = await new User({
      first_name,
      last_name,
      username: newUserName,
      email,
      password: cryptedPassword,
      isAdmin: true,
      bYear,
      bMonth,
      bDate,
      gender,
    }).save();

    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );

    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.last_name, url);
    const token = generateToken({ id: user._id.toString() }, "7d");

    res.send({
      id: user._id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      picture: user.picture,
      isAdmin: user.isAdmin,
      token: token,
      verified: user.verified,
      message: "Đăng ký thành công ! Xác thực email của bạn",
    });
  } catch (e) {
    if (e.message === "User validation failed: gender: gender is required") {
      res.status(500).json({ message: "Vui lòng nhập đầy đủ thông tin" });
    } else {
      res.status(500).json({ message: e.message });
    }
  }
}
module.exports = register;
