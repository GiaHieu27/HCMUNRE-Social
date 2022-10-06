import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
// import lgVideo from 'lightgallery/plugins/video';

function FriendInfo({ currentFriend, onlineFriends }) {
  const { message } = useSelector((state) => state.messenger);

  return (
    <div className="friend-info">
      <input type="checkbox" id="gallery" />
      <div className="image-name">
        <div className="image">
          <img src={currentFriend.picture} alt="avatar-friend" />
        </div>
        {onlineFriends &&
        onlineFriends.length > 0 &&
        onlineFriends.some((user) => user.userId === currentFriend._id) ? (
          <div className="active-user">Đang hoạt động</div>
        ) : (
          ''
        )}
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

      <LightGallery
        licenseKey="`0000-0000-000-0000"
        plugins={[lgZoom]}
        mode="lg-fade"
        elementClassNames="gallery"
      >
        {message &&
          message.length > 0 &&
          message.map(
            (m, index) =>
              m.message.image && (
                <img key={index} src={m.message.image} alt="image_mes_sent" />
              )
          )}
      </LightGallery>
    </div>
  );
}

FriendInfo.prototype = {
  currentFriend: PropTypes.object,
  onlineFriends: PropTypes.array,
};

export default FriendInfo;
