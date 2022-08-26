import { Link } from "react-router-dom";

function LeftLink({ img, text, notification }) {
  return (
    <>
      <Link
        to={text === "Đã lưu" ? "/saved" : text === "Bạn bè" ? "/friends" : ""}
      >
        <div className="left_link hover2">
          <img src={`../../left/${img}.png`} alt="" />
          {notification !== undefined ? (
            <div className="col">
              <div className="col_1">{text}</div>
              <div className="col_2">{notification}</div>
            </div>
          ) : (
            <span>{text}</span>
          )}
        </div>
      </Link>
    </>
  );
}

export default LeftLink;
