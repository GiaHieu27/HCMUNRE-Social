const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;

const oauth_link = "https://developers.google.com/oauthplayground/";
const { EMAIL, OAUTH_CLIENT_ID, REFRESH_TOKEN, OAUTH_CLIENT_SECRET } =
  process.env;

const auth = new OAuth2(
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  REFRESH_TOKEN,
  oauth_link
);

exports.sendVerificationEmail = (email, name, url) => {
  auth.setCredentials({
    refresh_token: REFRESH_TOKEN,
  });
  console.log("Thanh cong");

  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: OAUTH_CLIENT_ID,
      clientSecret: OAUTH_CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken,
    },
  });
  console.log("Thanh cong");
  console.log(stmp);

  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Xác thực email",
    html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;font-family:Roboto;font-weight:600;color:#3b5998"><img src="https://res.cloudinary.com/dxeclkxcd/image/upload/v1659866114/LogoTNMT_ehw7vh.png" alt="" style="width:30px"><span style="margin-left:15px;margin-top:5px;">Hành động: Kích hoạt tài khoản HCMUNRE Social</span></div><div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto"><span>Xin chào ${name}</span><div style="padding:20px 0"><span style="padding:1.5rem 0">Bạn vừa tạo một tài khoản trên HCMUNRE Social. Để hoàn tất đăng ký tài khoản, xin vui lòng xác thực email của bạn.</span></div><a href=${url} style="width:200px;padding:10px 15px;background:#007700;color:#fff;text-decoration:none;font-weight:600">Xác thực tài khoản</a><br><div style="padding-top:20px"></div></div>`,
  };
  console.log("Thanh cong");

  stmp.sendMail(mailOptions, (err, res) => {
    if (err) console.log(err);
    return res;
  });
};

exports.sendResetCode = (email, name, code) => {
  auth.setCredentials({
    refresh_token: REFRESH_TOKEN,
  });
  console.log("Thanh cong");

  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: OAUTH_CLIENT_ID,
      clientSecret: OAUTH_CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken,
    },
  });
  console.log("Thanh cong");

  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Thay đổi mật khẩu HCMUNRE Social",
    html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;font-family:Roboto;font-weight:600;color:#3b5998"><img src="https://res.cloudinary.com/dxeclkxcd/image/upload/v1659866114/LogoTNMT_ehw7vh.png" alt="" style="width:30px"><span style="margin-left:15px;margin-top:5px;">Hành động: Thay đổi mật khẩu tài khoản HCMUNRE Social</span></div><div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto"><span>Xin chào ${name}</span><div style="padding:20px 0"><span style="padding:1.5rem 0">Bạn vừa yêu cầu thay đổi mật khẩu trên HCMUNRE Social, xác thực mã dưới đây để hoàn tất quá trình thay đổi mật khẩu.</span></div><a  style="width:200px;padding:10px 15px;background:#007700;color:#fff;text-decoration:none;font-weight:600">${code}</a><br><div style="padding-top:20px"></div></div>`,
  };

  stmp.sendMail(mailOptions, (err, res) => {
    if (err) console.log(err);
    return res;
  });
};
