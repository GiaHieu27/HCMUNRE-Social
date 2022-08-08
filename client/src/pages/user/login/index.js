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

        <div className="login_row content-row">
          <div className="login_col align-items-center flex-col">
            <div className="text sign-in">
              <h2>Welcome back</h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Impedit obcaecati, accusantium molestias, laborum, aspernatur
                deserunt officia voluptatum tempora dicta quo ab ullam.
                Assumenda enim harum minima possimus dignissimos deserunt rem.
              </p>
            </div>
            <div className="img sign-in">
              <img src="../../images/social-login2.svg" alt="welcome" />
            </div>
          </div>

          <div className="login_col align-items-center flex-col">
            <div className="img sign-up">
              <img src="../../images/social-login1.svg" alt="welcome" />
            </div>
            <div className="text sign-up">
              <h2>Join with us</h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Impedit obcaecati, accusantium molestias, laborum, aspernatur
                deserunt officia voluptatum tempora dicta quo ab ullam.
                Assumenda enim harum minima possimus dignissimos deserunt rem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login2;
