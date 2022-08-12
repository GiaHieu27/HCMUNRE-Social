import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import axios from "axios";
import * as Yup from "yup";
import LoginInput from "../../../components/user/Inputs/LoginInput";

function CodeVerification({ reset, code, ...props }) {
  const { email } = props.userInfos;
  const handleSubmit = async () => {
    try {
      props.setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/validateResetPassword`,
        { email, code }
      );

      props.setError("");
      props.setVisible(3);
      props.setLoading(false);
    } catch (error) {
      props.setLoading(false);
      props.setError(error.response.data.message);
    }
  };

  const validationSchema = Yup.object({
    code: Yup.string()
      .required("Vui lòng nhập mã xác thực")
      .min(5, "Mã xác thực ít nhất 5 ký tự"),
  });

  return (
    <>
      <div className="reset_form">
        <div className="reset_form_header">Mã xác thực</div>
        <div className="reset_form_text">
          Nhập mã xác thực của bạn vào đây nhé
        </div>
        <Formik
          enableReinitialize
          initialValues={{ code }}
          validationSchema={validationSchema}
          onSubmit={() => {
            handleSubmit();
          }}
        >
          {(formik) => (
            <Form>
              <LoginInput
                reset
                type="text"
                name="code"
                onChange={(e) => props.setCode(e.target.value)}
                placeholder="Nhập mã xác thực"
              />
              {props.error && (
                <div className="error_text" style={{ marginTop: "-7px" }}>
                  {props.error}
                </div>
              )}
              <div className="reset_form_btns">
                <Link to="/" className="gray_btn">
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
      {}
    </>
  );
}

export default CodeVerification;
