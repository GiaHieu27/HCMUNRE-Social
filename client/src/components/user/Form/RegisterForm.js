import { useState } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import "boxicons";

import RegisterInput from "../Inputs/RegisterInput/RegisterInput";

function RegisterForm({ containerRef }) {
  const userInfos = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDate: new Date().getDate(),
    gender: "",
  };

  const [dateError, setDateError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [user, setUser] = useState(userInfos);
  const {
    first_name,
    last_name,
    email,
    password,
    conf_password,
    bYear,
    bMonth,
    bDate,
    gender,
  } = user;

  const [error, setError] = useState("");
  const [success, setSuccessse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const RegisterValidation = yup.object({
    first_name: yup
      .string()
      .required("Vui lòng nhập Họ")
      .max(30, "Tối đa 30 kí tự")
      .min(2, "Tối thiểu 2 lý tự")
      .matches(/^[aA-zZ]+$/, "Tên không được chứa số"),
    last_name: yup
      .string()
      .required("Vui lòng nhập Tên")
      .max(30, "Tối đa 30 kí tự")
      .min(2, "Tối thiểu 2 lý tự")
      .matches(/^[aA-zZ]+$/, "Tên không được chứa số"),
    email: yup
      .string()
      .required("Vui lòng nhập email để đăng ký tài khoản")
      .email("Vui lòng nhập đúng định dạng email")
      .max(100, "Email tối đa 100 kí tự"),
    password: yup
      .string()
      .required("Vui lòng nhập mật khẩu")
      .max(30, "Mật khẩu tối đa 30 kí tự")
      .min(6, "Mật khẩu tối thiểu 6 lý tự"),
    conf_password: yup
      .string()
      .required("Vui lòng nhập mật khẩu")
      .oneOf([yup.ref("password")], "Mật khẩu không trùng khớp"),
  });

  const handleClick = () => {
    containerRef.current.classList.toggle("sign-up");
    containerRef.current.classList.toggle("sign-in");
  };

  return (
    <div className="login_col align-items-center flex-col sign-up">
      <div className="form_wrapper align-items-center">
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            conf_password,
            // bYear,
            // bMonth,
            // bDate,
            // gender,
          }}
          validationSchema={RegisterValidation}
        >
          {(formik) => (
            <Form className="form sign-up">
              <RegisterInput
                type="text"
                name="first_name"
                placeholder="Họ của bạn"
                iconName="user"
                onChange={handleRegisterChange}
              />
              <RegisterInput
                type="text"
                name="last_name"
                placeholder="Tên của bạn"
                iconName="user"
                onChange={handleRegisterChange}
              />
              <RegisterInput
                type="text"
                name="email"
                placeholder="Nhập email của bạn"
                iconName="envelope"
                onChange={handleRegisterChange}
              />
              <RegisterInput
                type="password"
                name="password"
                placeholder="Nhập mật khẩu của bạn"
                iconName="lock-alt"
                onChange={handleRegisterChange}
              />
              <RegisterInput
                type="password"
                name="conf_password"
                placeholder="Nhập lại mật khẩu của bạn"
                iconName="lock-alt"
                onChange={handleRegisterChange}
              />

              <button type="submit">Đăng ký</button>
              <p>
                <span>Bạn đã có tài khoản </span>
                <b className="pointer" onClick={() => handleClick()}>
                  Đăng nhập tại đây
                </b>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default RegisterForm;
