const User = require('../../models/User');
const bcrypt = require('bcrypt');
const { generateToken } = require('../../helpers/tokens');

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).lean();
    if (!user) {
      return res.status(404).json({ message: 'Email chưa được đăng ký' });
    }

    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(404).json({ message: 'Mật khẩu không trùng khớp' });
    }

    const token = generateToken({ id: user._id.toString() }, '7d');

    if (user.isLock) {
      res.send({
        isLock: user.isLock,
        message: 'Tài khoản của bạn đã bị khóa',
      });
    } else {
      res.send({
        id: user._id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        picture: user.picture,
        isLock: user.isLock,
        token: token,
        isAdmin: user.isAdmin,
        verified: user.verified,
        message: 'Đăng nhập thành công',
      });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = login;
