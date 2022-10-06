import React from 'react';
import PropTypes from 'prop-types';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PhoneIcon from '@mui/icons-material/Phone';
import Message from './Message';
import MessageSend from './MessageSend';
import FriendInfo from './FriendInfo';
import TooltipMUI from '../TooltipMUI';

function RightSide(props) {
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
                    <img
                      src={props.currentFriend.picture}
                      alt="avatar -friend"
                    />
                    {props.onlineFriends &&
                    props.onlineFriends.length > 0 &&
                    props.onlineFriends.some(
                      (user) => user.userId === props.currentFriend._id
                    ) ? (
                      <div className="active-icon"></div>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="name">
                    <h3>
                      {props.currentFriend.first_name}{' '}
                      {props.currentFriend.last_name}
                    </h3>
                  </div>
                </div>
                <div className="icons">
                  <div className="icon">
                    <TooltipMUI title="Bắt đầu gọi điện">
                      <PhoneIcon color="success" />
                    </TooltipMUI>
                  </div>
                  <div className="icon">
                    <label htmlFor="dot">
                      <TooltipMUI title="Thông tin về cuộc trò chuyện">
                        <MoreHorizIcon color="success" />
                      </TooltipMUI>
                    </label>
                  </div>
                </div>
              </div>

              <Message
                currentFriend={props.currentFriend}
                scrollRef={props.scrollRef}
                typingMessage={props.typingMessage}
              />
              <MessageSend
                handleChangeInput={props.handleChangeInput}
                handleSendingMessage={props.handleSendingMessage}
                handleSendingMessageByPressingEnter={
                  props.handleSendingMessageByPressingEnter
                }
                newMessage={props.newMessage}
                setNewMessage={props.setNewMessage}
                imageMessage={props.imageMessage}
                setImageMessage={props.setImageMessage}
              />
            </div>
          </div>
          <div className="col-4">
            <FriendInfo
              // message={message}
              currentFriend={props.currentFriend}
              onlineFriends={props.onlineFriends}
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

  handleChangeInput: PropTypes.func,
  handleSendingMessage: PropTypes.func,
  setNewMessage: PropTypes.func,
  handleSendingMessageByPressingEnter: PropTypes.func,
  setImageMessage: PropTypes.func,

  newMessage: PropTypes.string,
  imageMessage: PropTypes.string,
  typingMessage: PropTypes.string,

  scrollRef: PropTypes.node,
};

export default RightSide;
