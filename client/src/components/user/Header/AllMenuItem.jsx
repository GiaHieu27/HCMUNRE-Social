import { Link } from "react-router-dom";

function AllMenuItem({ name, description, icon }) {
  return (
    <Link
      to={`/${
        name === "Bạn bè" ? "friends" : name === "Đã lưu" ? "saved" : ""
      }`}
      className="all_menu_item hover1"
    >
      <img src={`../../left/${icon}.png`} alt="" />
      <div className="all_menu_col">
        <span>{name}</span>
        <span>{description}</span>
      </div>
    </Link>
  );
}

export default AllMenuItem;
