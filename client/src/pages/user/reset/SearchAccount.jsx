import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import * as Yup from "yup";
import axios from "axios";
import LoginInput from "../../../components/user/Inputs/LoginInput";

function SearchAccount({ reset, email, ...props }) {
  const validateEmail = Yup.object({
    email: Yup.string()
      .required("Vui lòng nhập email")
      .email("Vui lòng nhập đúng định dạng email")
      .max(100, "Email tối đa 100 ký tự"),
  });

  const handleSubmit = async () => {
    try {
      props.setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/findUser`,
        { email }
      );
      props.setUserInfos(data);
      props.setVisible(1);
      props.setError("");
      props.setLoading(false);
    } catch (error) {
      props.setLoading(false);
      props.setError(error.response.data.message);
    }
  };

  return (
    <>
      <div className="reset_form">
        <div className="reset_form_header">Tìm kiếm tài khoản của bạn</div>
        <div className="reset_form_text">Nhập email của bạn vào ô dưới đây</div>
        <Formik
          enableReinitialize
          initialValues={{ email }}
          validationSchema={validateEmail}
          onSubmit={() => {
            handleSubmit();
          }}
        >
          {(formik) => (
            <Form>
              <LoginInput
                type="text"
                name="email"
                onChange={(e) => props.setEmail(e.target.value)}
                placeholder="Nhập email của bạn"
                reset
              />
              {props.error && (
                <div className="error_text" style={{ marginTop: "-7px" }}>
                  {props.error}
                </div>
              )}
              <div className="reset_form_btns">
                <Link to="/login" className="gray_btn">
                  Huỷ bỏ
                </Link>
                <button type="submit" className="blue_btn">
                  {props.loading ? (
                    <PulseLoader
                      color="white"
                      loading={props.loading}
                      size={6}
                    />
                  ) : (
                    "Tiếp tục"
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default SearchAccount;
