import "boxicons";

function RegisterForm() {
  return (
    <div className="login_col align-items-center flex-col">
      <div className="form_wrapper align-items-center">
        <div className="form sign-in">
          <div className="input-group">
            <box-icon color="gray" type="solid" name="user"></box-icon>
            <input type="text" placeholder="Username" />
          </div>

          <div className="input-group">
            <box-icon color="gray" type="solid" name="lock-alt"></box-icon>
            <input type="password" placeholder="Password" />
          </div>
          <button>Đăng nhập</button>
          <p>
            <b> Quên mật khẩu </b>
          </p>
          <p>
            <span> Bạn chưa có tài khoản </span>
            <b className="pointer">Đăng ký tại đây</b>
          </p>
        </div>
      </div>
      <div className="form_wrapper">
        <div className="social-list align-items-center sign-in">
          <div className="align-items-center facebook-bg">
            <box-icon color="white" type="logo" name="facebook"></box-icon>
          </div>
          <div className="align-items-center google-bg">
            <box-icon color="white" name="google" type="logo"></box-icon>
          </div>
          <div className="align-items-center twitter-bg">
            <box-icon color="white" name="twitter" type="logo"></box-icon>
          </div>
          <div className="align-items-center insta-bg">
            <box-icon color="white" name="instagram-alt" type="logo"></box-icon>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
