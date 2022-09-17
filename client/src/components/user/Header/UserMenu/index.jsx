import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

// import SettingsPrivacy from "./SettingsPrivacy";
// import HelpSupport from "./HelpSupport";
import DisplayAccessibility from './DisplayAccessibility';
import userSlice from '../../../../redux/slices/userSlice';

function UserMenu({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [visible, setVisible] = useState(0);

  const logOut = () => {
    Cookies.set('user', '');
    dispatch(userSlice.actions.LOGOUT());
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="mmenu">
      {visible === 0 && (
        <div>
          <Link to="/profile" className="mmenu_header hover3">
            <img src={user?.picture} alt="" />
            <div className="mmenu_col">
              <span>
                {user?.first_name} {user?.last_name}
              </span>
              <span>Xem trang cá nhân</span>
            </div>
          </Link>

          <div className="mmenu_splitter"></div>

          {/* <div className="mmenu_item hover3" onClick={() => setVisible(1)}>
            <div className="small_circle">
              <i className="settings_filled_icon"></i>
            </div>
            <span>Cài đặt &amp; điều khoản</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
          <div className="mmenu_item hover3" onClick={() => setVisible(2)}>
            <div className="small_circle">
              <i className="help_filled_icon"></i>
            </div>
            <span>Hỗ trợ</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div> */}
          <div className="mmenu_item hover3" onClick={() => setVisible(3)}>
            <div className="small_circle">
              <i className="dark_filled_icon"></i>
            </div>
            <span>Màn hình &amp; Trợ năng</span>
            <div className="rArrow">
              <i className="right_icon"></i>
            </div>
          </div>
          <div className="mmenu_item hover3" onClick={logOut}>
            <div className="small_circle">
              <i className="logout_filled_icon"></i>
            </div>
            <span>Đăng xuất</span>
          </div>
        </div>
      )}

      {/* {visible === 1 && <SettingsPrivacy setVisible={setVisible} />}
      {visible === 2 && <HelpSupport setVisible={setVisible} />} */}
      {visible === 3 && <DisplayAccessibility setVisible={setVisible} />}
    </div>
  );
}

UserMenu.propTypes = {
  user: PropTypes.object,
};

export default UserMenu;
