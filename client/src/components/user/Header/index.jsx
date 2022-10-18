import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Badge } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import PropTypes from 'prop-types';

import SearchMenu from './SearchMenu';
import AllMenu from './AllMenu';
import useClickOutSide from '../../../hooks/useClickOutSide';
import UserMenu from './UserMenu';
import { Menu, Search, Notifications, ArrowDown } from '../../../svg';
import Notification from './Notification';
import { SocketContext } from '../../../context/socketContext';
import notifySlice, { fetchNotify } from '../../../redux/slices/notifySlice';
import { updateStatusNotify } from '../../../apis/post';
import TooltipMUI from '../TooltipMUI';

function Header({ page, getPosts }) {
  const {
    user,
    notification: { notifies },
  } = useSelector((user) => ({ ...user }));
  const dispatch = useDispatch();
  const { socket } = React.useContext(SocketContext);
  const { pathname } = useLocation();
  const color = '#20a305';

  const [showSearchMenu, setShowSearchMenu] = React.useState(false);
  const [showAllMenu, setShowAllMenu] = React.useState(false);
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [showNotification, setShowNotification] = React.useState(false);

  const allMenu = React.useRef(null);
  useClickOutSide(allMenu, () => {
    setShowAllMenu(false);
  });

  const userMenu = React.useRef(null);
  useClickOutSide(userMenu, () => {
    setShowUserMenu(false);
  });

  const notificationRef = React.useRef(null);
  useClickOutSide(notificationRef, () => {
    setShowNotification(false);
  });

  const handleGetNotifications = () => {
    dispatch(notifySlice.actions.UPDATE_STATUS('unseen'));
    updateStatusNotify(user.id, user.token);
  };

  const countNotifySent = notifies.filter(
    (notify) => notify.status === 'sent'
  ).length;

  // get notifies from sender
  React.useEffect(() => {
    socket.on('getNotification', (dataObj) => {
      dispatch(notifySlice.actions.UPDATE_REACT(dataObj));
    });
  }, [socket]);
  // get all notifies
  React.useEffect(() => {
    dispatch(fetchNotify(user.token));
  }, [dispatch, user.token]);

  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header_logo d-flex align-items-center">
          <div className="circle me-2">
            <img
              src="/icons/LogoTNMT.svg"
              alt="logo-header"
              width={40}
              height={40}
            />
          </div>
          <img src="/icons/HCMUNRE.png" alt="logo" width={120} height={45} />
        </Link>
      </div>

      <div className="header_middle">
        <div
          className="search search1"
          onClick={() => {
            setShowSearchMenu(true);
          }}
        >
          <Search color={color} />
          <input type="text" placeholder="Tìm kiếm" className="hide_input" />
        </div>
        {showSearchMenu && (
          <SearchMenu color={color} setShowSearchMenu={setShowSearchMenu} />
        )}
      </div>

      <div className="header_right">
        <TooltipMUI title="Tài khoản">
          <Link
            to="/profile"
            className={`profile_link hover4 ${
              page === 'profile' ? 'active_link' : ''
            }`}
          >
            <img src={user?.picture} alt="" />
            <span>{user?.last_name}</span>
          </Link>
        </TooltipMUI>

        {/* All menu */}
        <TooltipMUI title="Menu">
          <div
            className={`circle_icon ${
              showAllMenu ? 'active_header' : 'hover1'
            }`}
            ref={allMenu}
          >
            <div
              onClick={() => {
                setShowAllMenu(!showAllMenu);
              }}
            >
              <div style={{ transform: 'translateY(-2px)' }}>
                <Menu />
              </div>
            </div>
            {showAllMenu && <AllMenu />}
          </div>
        </TooltipMUI>

        {/* Messenger */}
        {pathname !== '/messenger' && (
          <TooltipMUI title="Nhắn tin">
            <Link to="/messenger" className="circle_icon hover1">
              <MessageIcon />
            </Link>
          </TooltipMUI>
        )}

        {/* Notification */}
        <TooltipMUI title="Thông báo">
          <div
            className={`circle_icon ${
              showNotification ? 'active_header' : 'hover1'
            }`}
            ref={notificationRef}
          >
            <div
              onClick={() => {
                handleGetNotifications();
                setShowNotification(!showNotification);
              }}
            >
              <Badge
                badgeContent={countNotifySent}
                color="error"
                sx={{
                  '& .MuiBadge-badge': {
                    top: '-4px',
                    right: '-1px',
                  },
                }}
              >
                <Notifications />
              </Badge>
            </div>
            {showNotification && <Notification />}
          </div>
        </TooltipMUI>

        {/* User menu */}
        <TooltipMUI title="Cài đặt">
          <div
            className={`circle_icon ${
              showUserMenu ? 'active_header' : 'hover1'
            }`}
            ref={userMenu}
          >
            <div onClick={() => setShowUserMenu(!showUserMenu)}>
              <div style={{ transform: 'translateY(-1px)' }}>
                <ArrowDown />
              </div>
            </div>
            {showUserMenu && <UserMenu user={user} />}
          </div>
        </TooltipMUI>
      </div>
    </header>
  );
}

Header.propTypes = {
  page: PropTypes.string,
  getPosts: PropTypes.func,
};

export default Header;
