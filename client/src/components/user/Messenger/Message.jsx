import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

function Message({ currentFriend, typingMessage, scrollRef }) {
  const {
    user,
    messenger: { message },
  } = useSelector((state) => ({ ...state }));

  return (
    <>
      <div className="message-show">
        {message && message.length > 0
          ? message.map((m, index) => {
              m.senderId === user.id && (
                <div className="my-message">
                  <div className="image-message">
                    <div className="my-text">
                      <p className="message-text">How are you</p>
                    </div>
                  </div>
                  <div className="time">vdvd</div>
                </div>
              );
            })
          : ''}

        <div className="fd-message">
          <div className="image-message-time">
            <img
              src="https://res.cloudinary.com/dxeclkxcd/image/upload/v1659866114/LogoTNMT_ehw7vh.png"
              alt=""
            />
            <div className="message-time">
              <div className="fd-text">
                <p className="message-text">vnskjvnsjnvjk nvlksnv</p>
              </div>
              <div className="time">ff dsnl</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Message.prototype = {};

export default Message;
