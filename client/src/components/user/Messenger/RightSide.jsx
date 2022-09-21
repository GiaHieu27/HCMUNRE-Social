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
  handleSendMessagePressEnter,
  handleSendMessage,
  handleInputChange,
  setImageMessage,
  currentFriend,
  typingMessage,
  setNewMessage,
  imageMessage,
  newMessage,
  onlineFriends,
  scrollRef,
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
                    <img src={currentFriend.picture} alt="avatar -friend" />
                    {onlineFriends &&
                    onlineFriends.length > 0 &&
                    onlineFriends.some(
                      (user) => user.userId === currentFriend._id
                    ) ? (
                      <div className="active-icon"></div>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="name">
                    <h3>
                      {currentFriend.first_name} {currentFriend.last_name}
                    </h3>
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

              <Message
                currentFriend={currentFriend}
                scrollRef={scrollRef}
                typingMessage={typingMessage}
              />
              <MessageSend
                handleInputChange={handleInputChange}
                handleSendMessage={handleSendMessage}
                handleSendMessagePressEnter={handleSendMessagePressEnter}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                imageMessage={imageMessage}
                setImageMessage={setImageMessage}
              />
            </div>
          </div>
          <div className="col-4">
            <FriendInfo
              // message={message}
              currentFriend={currentFriend}
              onlineFriends={onlineFriends}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

RightSide.prototype = {
  currentFriend: PropTypes.object,
  onlineFriends: PropTypes.array,

  handleInputChange: PropTypes.func,
  handleSendMessage: PropTypes.func,
  setNewMessage: PropTypes.func,
  handleSendMessagePressEnter: PropTypes.func,
  setImageMessage: PropTypes.func,

  newMessage: PropTypes.string,
  imageMessage: PropTypes.string,
  typingMessage: PropTypes.string,

  scrollRef: PropTypes.node,
};

export default RightSide;
