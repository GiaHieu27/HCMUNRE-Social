// import "boxicons";

import { Form, Formik } from "formik";
import LoginInput from "../Inputs/LoginInput/LoginInput";

function LoginForm({ containerRef }) {
  const handleClick = () => {
    containerRef.current.classList.toggle("sign-in");
    containerRef.current.classList.toggle("sign-up");
  };

  return (
    <div className="login_col align-items-center flex-col sign-in">
      <div className="form_wrapper align-items-center">
        <Formik>
          {(formik) => (
            <Form className="form sign-in">
              <LoginInput
                type="text"
                name="email"
                placeholder="Nhập email của bạn"
                iconName="envelope"
              />
              <LoginInput
                type="password"
                name="password"
                placeholder="Nhập mật khẩu của bạn"
                iconName="lock-alt"
              />
              <button>Đăng nhập</button>
              <p>
                <b> Quên mật khẩu </b>
              </p>
              <p>
                <span> Bạn chưa có tài khoản </span>
                <b className="pointer" onClick={() => handleClick()}>
                  Đăng ký tại đây
                </b>
              </p>
            </Form>
          )}
        </Formik>
      </div>

      {/* <div className="form_wrapper">
        <div className="social-list align-items-center sign-in">
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
      </div> */}
    </div>
  );
}

export default LoginForm;
