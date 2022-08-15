import LoginForm from "../../../components/user/Form/LoginForm";
import Footer from "../../../components/user/Form/Footer";
import RegisterForm from "../../../components/user/Form/RegisterForm";
import { useState } from "react";

function Login() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm setVisible={setVisible} />
        {visible && <RegisterForm setVisible={setVisible} />}
        <Footer />
      </div>
    </div>
  );
}

export default Login;
