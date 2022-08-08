import React, { useEffect, useRef } from "react";
import LoginForm from "../../../components/user/Form/LoginForm";
import RegisterForm from "../../../components/user/Form/RegisterForm";

function Login2() {
  const containerRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      containerRef.current.classList.add("sign-in");
    });
  }, []);

  return (
    <div className="login">
      <div className="login_container" ref={containerRef}>
        <div className="login_row">
          <RegisterForm containerRef={containerRef} />
          <LoginForm containerRef={containerRef} />
        </div>
      </div>
    </div>
  );
}

export default Login2;
