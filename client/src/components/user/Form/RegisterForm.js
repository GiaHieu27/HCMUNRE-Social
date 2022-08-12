import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import PropagateLoader from "react-spinners/PropagateLoader";
import Cookies from "js-cookie";
import axios from "axios";
import * as yup from "yup";
import "boxicons";

import RegisterInput from "../Inputs/RegisterInput/RegisterInput";
import DateOfBirthSelect from "../Inputs/SelectInput/DateOfBirthSelect";
import GenderSelect from "../Inputs/RadioInput/GenderRadio";
import userSlice from "../../../redux/slices/userSlice";

function RegisterForm({ containerRef }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  const [error, setError] = useState("");
  const [success, setSuccessse] = useState("");
  const [loading, setLoading] = useState(false);
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

  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(108), (val, index) => currentYear - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const getDates = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(new Array(getDates()), (val, index) => 1 + index);

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const RegisterValidation = yup.object({
    first_name: yup
      .string()
      .required("Vui lòng nhập Họ")
      .min(2, "Tối thiểu 2 lý tự")
      .max(30, "Tối đa 30 kí tự")
      .matches(/^[aA-zZ]+$/, "Họ không được chứa số"),
    last_name: yup
      .string()
      .required("Vui lòng nhập Tên")
      .min(2, "Tối thiểu 2 lý tự")
      .max(30, "Tối đa 30 kí tự")
      .matches(/^[aA-zZ]+$/, "Tên không được chứa số"),
    email: yup
      .string()
      .required("Vui lòng nhập email")
      .email("Email không đúng định dạng")
      .max(100, "Email tối đa 100 kí tự"),
    password: yup
      .string()
      .required("Vui lòng nhập mật khẩu")
      .min(6, "Mật khẩu tối thiểu 6 ký tự")
      .max(30, "Mật khẩu tối đa 30 kí tự"),
    conf_password: yup
      .string()
      .required("Vui lòng nhập mật khẩu")
      .oneOf([yup.ref("password")], "Mật khẩu không trùng khớp"),
  });

  const checkDateAndGender = () => {
    let currentDate = new Date();
    let pickedDate = new Date(bYear, bMonth - 1, bDate);
    let atleast14 = new Date(1970 + 14, 0, 1);
    let noMoreThan70 = new Date(1970 + 70, 0, 1);
    if (currentDate - pickedDate < atleast14) {
      setDateError("Vui lòng chọn đúng sinh nhật");
    } else if (currentDate - pickedDate > noMoreThan70) {
      setDateError("Vui lòng chọn sinh nhật");
    } else {
      setDateError("");
    }
    if (gender === "") {
      setGenderError("Vui lòng chọn giới tính");
    } else {
      setGenderError("");
    }
  };

  const registerSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        {
          first_name,
          last_name,
          email,
          password,
          bYear,
          bMonth,
          bDate,
          gender,
        }
      );

      setError("");
      setSuccessse(data.message);

      const { message, ...rest } = data;
      setTimeout(() => {
        dispatch(userSlice.actions.LOGIN(rest));
        Cookies.set("user", JSON.stringify(rest));
        navigate("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSuccessse("");
      setError(error.response.data.message);
    }
  };

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
            bYear,
            bMonth,
            bDate,
            gender,
          }}
          validationSchema={RegisterValidation}
          onSubmit={() => {
            checkDateAndGender();
            registerSubmit();
          }}
        >
          {(formik) => (
            <Form className="form sign-up">
              <div className="reg_row">
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
              </div>
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
              <div className="reg_col">
                <div className="reg_line_header">
                  Sinh nhật <i className="info_icon"></i>
                </div>
                <DateOfBirthSelect
                  bYear={bYear}
                  bDate={bDate}
                  bMonth={bMonth}
                  handleRegisterChange={handleRegisterChange}
                  years={years}
                  months={months}
                  days={days}
                  dateError={dateError}
                />
              </div>

              <div className="reg_col">
                <div className="reg_line_header">
                  Giới tính <i className="info_icon"></i>
                </div>
                <GenderSelect
                  genderError={genderError}
                  handleRegisterChange={handleRegisterChange}
                />
              </div>

              <button
                type="submit"
                style={{ paddingBottom: `${loading ? "11px" : "0"}` }}
              >
                {loading ? (
                  <PropagateLoader color="white" loading={loading} size={15} />
                ) : (
                  "Đăng ký"
                )}
              </button>
              {error && <div className="error_text">{error}</div>}
              {success && <div className="success_text">{success}</div>}
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
