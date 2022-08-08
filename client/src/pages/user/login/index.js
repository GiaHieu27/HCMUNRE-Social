import React from "react";
import LoginForm from "../../../components/user/Form/LoginForm";
import RegisterForm from "../../../components/user/Form/RegisterForm";

function Login2() {
  return (
    <div className="login">
      <div className="login_container">
        <div className="login_row">
          <LoginForm />
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}

export default Login2;
