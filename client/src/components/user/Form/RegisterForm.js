import "boxicons";

function RegisterForm({ containerRef }) {
  const handleClick = () => {
    containerRef.current.classList.toggle("sign-up");
    containerRef.current.classList.toggle("sign-in");
  };

  return (
    <div className="login_col align-items-center flex-col">
      <div className="form_wrapper align-items-center">
        <div className="form sign-up">
          <div className="input-group">
            <box-icon color="gray" type="solid" name="envelope"></box-icon>
            <input type="text" placeholder="Email" />
          </div>

          <div className="input-group">
            <box-icon color="gray" type="solid" name="lock-alt"></box-icon>
            <input type="password" placeholder="Password" />
          </div>
          <div className="input-group">
            <box-icon color="gray" type="solid" name="lock-alt"></box-icon>
            <input type="password" placeholder="Nhập lại mật khẩu" />
          </div>
          <button>Đăng ký</button>
          <p>
            <b> Quên mật khẩu </b>
          </p>
          <p>
            <span> Bạn chưa có tài khoản </span>
            <b className="pointer" onClick={() => handleClick()}>
              Đăng ký tại đây
            </b>
          </p>
        </div>
      </div>
      <div className="form_wrapper">
        <div className="social-list align-items-center sign-up">
          <div className="align-items-center bg-facebook">
            <box-icon color="white" type="logo" name="facebook"></box-icon>
          </div>
          <div className="align-items-center bg-google">
            <box-icon color="white" name="google" type="logo"></box-icon>
          </div>
          <div className="align-items-center bg-twitter">
            <box-icon color="white" name="twitter" type="logo"></box-icon>
          </div>
          <div className="align-items-center bg-insta">
            <box-icon color="white" name="instagram-alt" type="logo"></box-icon>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
