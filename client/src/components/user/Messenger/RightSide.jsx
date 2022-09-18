import React from 'react';
import PropTypes from 'prop-types';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Message from './Message';
import MessageSend from './MessageSend';
import FriendInfo from './FriendInfo';
// import FriendInfo from './FriendInfo';
// import Message from './Message';
// import MessageSend from './MessageSend';

function RightSide({
  currentFriend,
  newMessage,
  handleInputChange,
  handleSendMessage,
  setNewMessage,
  imageMessage,
  setImageMessage,
  activeUser,
  typingMessage,
  scrollRef,
  message,
}) {
  return (
    <div className="col-9">
      <div className="right-side">
        <input type="checkbox" id="dot" />
        <div className="row-custom">
          <div className="col-8">
            <div className="message-send-show">
              <div className="header">
                <div className="image-name">
                  <div className="image">
                    {/* <img src={currentFriend.picture} alt="" /> */}
                    <img
                      src="https://res.cloudinary.com/dxeclkxcd/image/upload/v1659866114/LogoTNMT_ehw7vh.png"
                      alt=""
                    />
                    {activeUser &&
                    activeUser.length > 0 &&
                    activeUser.some((u) => u.userId === currentFriend._id) ? (
                      <div className="active-icon"></div>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="name">
                    {/* <h3>
                      {currentFriend.first_name} {currentFriend.last_name}
                    </h3> */}
                    <h3>Hieu</h3>
                  </div>
                </div>
                <div className="icons">
                  {/* <div className="icon">
                    <IoCall />
                  </div>
                  <div className="icon">
                    <BsCameraVideoFill />
                  </div> */}
                  <div className="icon">
                    <label htmlFor="dot">
                      <MoreHorizIcon color="success" />
                    </label>
                  </div>
                </div>
              </div>

              <Message />
              <MessageSend
              // imageMessage={imageMessage}
              // setImageMessage={setImageMessage}
              // handleSendMessage={handleSendMessage}
              // handleInputChange={handleInputChange}
              // newMessage={newMessage}
              // setNewMessage={setNewMessage}
              />
            </div>
          </div>
          <div className="col-4">
            <FriendInfo
            // message={message}
            // currentFriend={currentFriend}
            // activeUser={activeUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

RightSide.prototype = {
  currentFriend: PropTypes.object,
};

export default RightSide;
