import React from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function FriendInfo({ currentFriend, activeUser, message }) {
  return (
    <div className="friend-info">
      <input type="checkbox" id="gallery" />
      <div className="image-name">
        <div className="image">
          <img src={currentFriend.picture} alt="" />
        </div>
        {/* {activeUser &&
        activeUser.length > 0 &&
        activeUser.some((u) => u.userId === currentFriend._id) ? (
          <div className="active-user">Đang hoạt động</div>
        ) : (
          ''
        )} */}
        <div className="active-user">Đang hoạt động</div>
        <div className="name">
          <h4>
            {currentFriend.first_name} {currentFriend.last_name}
          </h4>
        </div>
      </div>
      <div className="others">
        {/* <div className="custom-chat">
          <h3>Coustomise Chat</h3>
          <BsChevronDown />
        </div>
        <div className="privacy">
          <h3>Privacy and Support</h3>
          <BsChevronDown />
        </div> */}
        <div className="media">
          <h3>File đã chia sẻ</h3>
          <label htmlFor="gallery">
            <KeyboardArrowDownIcon />
          </label>
        </div>
      </div>
      <div className="gallery">
        <img
          src="https://res.cloudinary.com/dxeclkxcd/image/upload/v1661770239/LuongHieu/post_contents/rjhcp94zfsawj90qqexm.jpg"
          alt=""
        />
        <img
          src="https://res.cloudinary.com/dxeclkxcd/image/upload/v1661770239/LuongHieu/post_contents/rjhcp94zfsawj90qqexm.jpg"
          alt=""
        />
        <img
          src="https://res.cloudinary.com/dxeclkxcd/image/upload/v1661770239/LuongHieu/post_contents/rjhcp94zfsawj90qqexm.jpg"
          alt=""
        />
        <img
          src="https://res.cloudinary.com/dxeclkxcd/image/upload/v1661770239/LuongHieu/post_contents/rjhcp94zfsawj90qqexm.jpg"
          alt=""
        />
      </div>
    </div>
  );
}

FriendInfo.prototype = {
  currentFriend: PropTypes.object,
};

export default FriendInfo;
