import { Formik } from "formik";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as yup from "yup";

const schema = yup.object().shape({
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

function LoginAdmin() {
  return (
    <Container
      fluid
      className="bg-success p-2 text-dark bg-opacity-50 d-flex align-items-center"
      style={{ height: "100vh" }}
    >
      <Container>
        <Formik
          validationSchema={schema}
          onSubmit={console.log}
          initialValues={{
            email: "",
            password: "",
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
          }) => {
            return (
              <Form
                noValidate
                onSubmit={handleSubmit}
                className="admin-form mx-auto"
              >
                <Stack gap={3}>
                  <img
                    src="/icons/LogoTNMT.svg"
                    alt="logo"
                    width={75}
                    height={75}
                    className="mx-auto"
                  />
                  <h3 className="text-center">Đăng nhập</h3>
                  <Form.Group md="4" controlId="validationFormik01">
                    <Form.Floating>
                      <Form.Control
                        type="text"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={errors.email && touched.email}
                        placeholder="Email"
                      />
                      <Form.Label>Email</Form.Label>
                    </Form.Floating>
                    {touched.email && errors.email && (
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Form.Group md="4" controlId="validationFormik02">
                    <Form.Floating>
                      <Form.Control
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={errors.password && touched.password}
                        placeholder="Mật khẩu"
                      />
                      <Form.Label>Mật khẩu</Form.Label>
                    </Form.Floating>
                    {touched.password && errors.password && (
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Button type="submit" variant="success">
                    Đăng nhập
                  </Button>
                </Stack>
              </Form>
            );
          }}
        </Formik>
      </Container>
    </Container>
  );
}

export default LoginAdmin;
