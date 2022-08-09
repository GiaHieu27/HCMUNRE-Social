// import "boxicons";
import { useState } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import LoginInput from "../Inputs/LoginInput/LoginInput";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import userSlice from "../../../redux/slices/userSlice";
import PropagateLoader from "react-spinners/PropagateLoader";

const loginInfo = {
  email: "",
  password: "",
};

function LoginForm({ containerRef }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, setLogin] = useState(loginInfo);
  const [error, setError] = useState("");
  const [success, setSuccessse] = useState("");
  const [loading, setLoading] = useState(false);

  const { email, password } = login;

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const loginValidation = yup.object({
    email: yup
      .string()
      .required("Vui lòng nhập email")
      .email("Vui lòng nhập đúng định dạng email")
      .max(100, "Tối đa 100 kí tự"),
    password: yup
      .string()
      .required("Vui lòng nhập mật khẩu")
      .min(6, "Mật khẩu tối thiểu 6 kí tự"),
  });

  const handleLoginSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        { email, password }
      );
      setError("");

      setTimeout(() => {
        dispatch(userSlice.actions.LOGIN(data));
        Cookies.set("user", JSON.stringify(data));
        navigate("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSuccessse("");
      setError(error.response.data.message);
    }
  };

  const handleClick = () => {
    containerRef.current.classList.toggle("sign-in");
    containerRef.current.classList.toggle("sign-up");
  };

  return (
    <div className="login_col align-items-center flex-col sign-in">
      <div className="form_wrapper align-items-center">
        <Formik
          enableReinitialize
          initialValues={{
            email,
            password,
          }}
          validationSchema={loginValidation}
          onSubmit={() => handleLoginSubmit()}
        >
          {(formik) => (
            <Form className="form sign-in">
              <LoginInput
                type="text"
                name="email"
                placeholder="Nhập email của bạn"
                iconName="envelope"
                onChange={handleChangeLogin}
              />
              <LoginInput
                type="password"
                name="password"
                placeholder="Nhập mật khẩu của bạn"
                iconName="lock-alt"
                onChange={handleChangeLogin}
                bottom
              />
              <button style={{ paddingBottom: `${loading ? "11px" : "0"}` }}>
                {loading ? (
                  <PropagateLoader color="white" loading={loading} size={15} />
                ) : (
                  "Đăng nhập"
                )}
              </button>
              {error && <div className="error_text">{error}</div>}
              {success && <div className="success_text">{success}</div>}
              <p>
                <b>
                  <Link to="/reset">Quên mật khẩu</Link>
                </b>
              </p>
              <p>
                <span> Bạn chưa có tài khoản </span>
                <b className="pointer" onClick={() => handleClick()}>
                  Đăng ký ngay
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
