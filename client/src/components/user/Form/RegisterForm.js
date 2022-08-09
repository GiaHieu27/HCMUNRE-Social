import "boxicons";
import { Form, Formik } from "formik";

import RegisterInput from "../Inputs/RegisterInput/RegisterInput";

function RegisterForm({ containerRef }) {
  const handleClick = () => {
    containerRef.current.classList.toggle("sign-up");
    containerRef.current.classList.toggle("sign-in");
  };

  return (
    <div className="login_col align-items-center flex-col sign-up">
      <div className="form_wrapper align-items-center">
        <Formik>
          {(formik) => (
            <Form className="form sign-up">
              <RegisterInput
                type="text"
                name="first_name"
                placeholder="Họ của bạn"
                iconName="user"
              />
              <RegisterInput
                type="text"
                name="last_name"
                placeholder="Tên của bạn"
                iconName="user"
              />
              <RegisterInput
                type="text"
                name="email"
                placeholder="Nhập email của bạn"
                iconName="envelope"
              />
              <RegisterInput
                type="password"
                name="password"
                placeholder="Nhập mật khẩu của bạn"
                iconName="lock-alt"
              />
              <RegisterInput
                type="password"
                name="password"
                placeholder="Nhập lại mật khẩu của bạn"
                iconName="lock-alt"
              />

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
            </Form>
          )}
        </Formik>
      </div>
      {/* <div className="form_wrapper">
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
      </div> */}
    </div>
  );
}

export default RegisterForm;
