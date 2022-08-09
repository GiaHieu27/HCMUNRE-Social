import { useEffect, useRef } from "react";
import Background from "../../../components/user/Form/Background";

import LoginForm from "../../../components/user/Form/LoginForm";
import RegisterForm from "../../../components/user/Form/RegisterForm";

function Login() {
  const containerRef = useRef(null);

  useEffect(() => {
    containerRef.current.classList.add("sign-in");
  }, []);

  return (
    <div className="login">
      <div className="login_container" ref={containerRef}>
        <div className="login_row">
          <RegisterForm containerRef={containerRef} />
          <LoginForm containerRef={containerRef} />
        </div>
        <Background />
      </div>
    </div>
  );
}

export default Login;
