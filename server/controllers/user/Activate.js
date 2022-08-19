const jwt = require("jsonwebtoken");

const User = require("../../models/User");
const { generateToken } = require("../../helpers/tokens");
const { sendVerificationEmail } = require("../../helpers/mailer");

exports.activeAccount = async (req, res) => {
  try {
    const validUser = req.user.id;
    const { tokenUrl } = req.body;
    const user = jwt.verify(tokenUrl, process.env.TOKEN_SECRET);

    console.log(req.user);
    console.log(user);

    const check = await User.findById(user.id);

    if (validUser !== user.id) {
      return res
        .status(400)
        .json({ message: "Bạn không có quyền xác minh tài khoản này" });
    }

    if (check.verified === true) {
      return res
        .status(400)
        .json({ message: "Email đã được xác thực trước đó" });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      res.status(200).json({ message: "Tài khoản đã được xác minh" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.sendVerification = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id).lean();
    if (user.verified === true) {
      return res.status(404).json({ message: "Tài khoản đã được xác minh" });
    }
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );

    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.last_name, url);
    return res.status(200).json({ message: "Email xác minh đã được gửi đi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
