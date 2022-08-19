import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SenVerification({ user }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const sendVerifycationLink = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/sendVerification`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setError("");
      setSuccess(data.message);
    } catch (error) {
      setSuccess("");
      setError(error.response.data.message);
      navigate(0);
    }
  };

  return (
    <div className="send_verification mb-3">
      <span>
        Tài khoản của bạn chưa được xác minh, xác minh tài khoản của bạn trước
        khi liên kết xác thực hết hạn.
      </span>
      <p
        className="mb-0"
        onClick={() => {
          sendVerifycationLink();
        }}
      >
        Nhấp vào đây để gửi lại liên kết
      </p>
      {success && <div className="success_text mt-0">{success}</div>}
      {error && <div className="error_text">{error}</div>}
    </div>
  );
}

export default SenVerification;
