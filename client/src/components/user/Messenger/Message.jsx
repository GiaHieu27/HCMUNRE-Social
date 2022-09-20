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
          ? message.map((m, index) =>
              m.senderId === user.id ? (
                <div key={index} className="my-message" ref={scrollRef}>
                  <div className="image-message">
                    <div className="my-text">
                      <p className="message-text my">
                        {m.message.text === '' ? (
                          <img
                            src={m.message.image}
                            alt="avatar"
                            style={{ background: 'none' }}
                          />
                        ) : (
                          m.message.text
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="time">
                    {moment(m.createdAt).startOf('mini').fromNow()}
                  </div>
                </div>
              ) : (
                <div key={index} className="fd-message" ref={scrollRef}>
                  <div className="image-message-time">
                    <img src={currentFriend.picture} alt="avatar_friend" />
                    <div className="message-time">
                      <div className="fd-text">
                        <p className="message-text fd">
                          {m.message.text === '' ? (
                            <img src={m.message.image} alt="" />
                          ) : (
                            m.message.text
                          )}
                        </p>
                      </div>
                      <div className="time">
                        {moment(m.createdAt).startOf('mini').format('LT')}
                      </div>
                    </div>
                  </div>
                </div>
              )
            )
          : ''}
      </div>
    </>
  );
}

Message.prototype = {
  currentFriend: PropTypes.object,
  scrollRef: PropTypes.node,
};

export default Message;
