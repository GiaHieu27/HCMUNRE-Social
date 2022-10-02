import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Badge } from '@mui/material';
import PropTypes from 'prop-types';

import SearchMenu from './SearchMenu';
import AllMenu from './AllMenu';
import useClickOutSide from '../../../hooks/useClickOutSide';
import UserMenu from './UserMenu';
import {
  Friends,
  Gaming,
  HomeActive,
  Market,
  Menu,
  Search,
  Notifications,
  Watch,
  Messenger,
  ArrowDown,
  Home,
  FriendsActive,
} from '../../../svg';
import Notification from './Notification';
import { SocketContext } from '../../../context/socketContext';

function Header({ page, getPosts }) {
  const { user } = useSelector((user) => ({ ...user }));
  const { socket } = React.useContext(SocketContext);
  const { pathname } = useLocation();
  const color = '#20a305';

  const [showSearchMenu, setShowSearchMenu] = React.useState(false);
  const [showAllMenu, setShowAllMenu] = React.useState(false);
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [showNotification, setShowNotification] = React.useState(false);
  const [notifications, setNotifications] = React.useState([]);

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

  React.useEffect(() => {
    socket.on('getNotification', (data) => {
      console.log(data);
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);

  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header_logo">
          <div className="circle">
            <img
              src="/icons/LogoTNMT.svg"
              alt="logo-header"
              width={40}
              height={40}
            />
          </div>
        </Link>
        <div
          className="search search1"
          onClick={() => {
            setShowSearchMenu(true);
          }}
        >
          <Search color={color} />
          <input type="text" placeholder="Tìm kiếm" className="hide_input" />
        </div>
      </div>
      {showSearchMenu && (
        <SearchMenu color={color} setShowSearchMenu={setShowSearchMenu} />
      )}

      <div className="header_middle">
        <Link
          to="/"
          className={`middle_icon ${page === 'home' ? 'active' : 'hover1'}`}
          onClick={() => getPosts()}
        >
          {page === 'home' ? (
            <HomeActive color={color} />
          ) : (
            <Home color={color} />
          )}
        </Link>
        <Link
          to="/friends"
          className={`middle_icon ${page === 'friends' ? 'active' : 'hover1'}`}
        >
          {page === 'friends' ? (
            <FriendsActive color={color} />
          ) : (
            <Friends color={color} />
          )}
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Watch color={color} />
          <div className="middle_notification">9+</div>
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Market color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Gaming color={color} />
        </Link>
      </div>

      <div className="header_right">
        <Link
          to="/profile"
          className={`profile_link hover4 ${
            page === 'profile' ? 'active_link' : ''
          }`}
        >
          <img src={user?.picture} alt="" />
          <span>{user?.last_name}</span>
        </Link>

        {/* All menu */}
        <div
          className={`circle_icon ${showAllMenu ? 'active_header' : 'hover1'}`}
          ref={allMenu}
          onClick={() => {
            setShowAllMenu(!showAllMenu);
          }}
        >
          <div style={{ transform: 'translateY(-2px)' }}>
            <Menu />
          </div>
          {showAllMenu && <AllMenu />}
        </div>

        {/* Messenger */}
        {pathname !== '/messenger' && (
          <Link to="/messenger" className="circle_icon hover1">
            <Messenger />
          </Link>
        )}

        {/* Notification */}
        <div
          className={`circle_icon ${
            showNotification ? 'active_header' : 'hover1'
          }`}
          ref={notificationRef}
          onClick={() => setShowNotification(!showNotification)}
        >
          <Badge
            badgeContent={notifications.length}
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
          {showNotification && <Notification notifications={notifications} />}
        </div>

        {/* User menu */}
        <div
          className={`circle_icon ${showUserMenu ? 'active_header' : 'hover1'}`}
          ref={userMenu}
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
          <div style={{ transform: 'translateY(-1px)' }}>
            <ArrowDown />
          </div>
          {showUserMenu && <UserMenu user={user} />}
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  page: PropTypes.string,
  getPosts: PropTypes.func,
};

export default Header;
