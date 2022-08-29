import { Link } from "react-router-dom";
import { Dots } from "../../../svg";

function ProfileMenu() {
  return (
    <div className="profile_menu_wrap">
      <div className="profile_menu">
        <Link to="/" className="profile_menu_active">
          Bài viết
        </Link>
        <Link to="/" className="hover1">
          Bạn bè
        </Link>
        <Link to="/" className="hover1">
          Hình ảnh
        </Link>
        <Link to="/" className="hover1">
          Videos
        </Link>
        <div className="p10_dots">
          <Dots />
        </div>
      </div>
    </div>
  );
}

export default ProfileMenu;
