import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import SyncLoader from 'react-spinners/SyncLoader';
import moment from 'moment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function Message({ currentFriend, typingMessage, scrollRef }) {
  const {
    user,
    messenger: { message },
  } = useSelector((state) => ({ ...state }));

  console.log(message);

  return (
    <>
      <div className="message-show">
        {message && message.length > 0 ? (
          message.map((m, index) =>
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
                    {index === message.length - 1 && m.senderId === user.id ? (
                      m.status === 'seen' ? (
                        <img
                          className="img"
                          src={currentFriend.picture}
                          alt=""
                        />
                      ) : m.status === 'sent' ? (
                        <span>
                          <CheckCircleIcon
                            sx={{ width: '0.75em', height: '0.75em' }}
                          />
                        </span>
                      ) : (
                        <span>
                          <CheckCircleOutlineIcon
                            sx={{ width: '0.75em', height: '0.75em' }}
                          />
                        </span>
                      )
                    ) : (
                      ''
                    )}
                    {/* {index === message.length - 1 &&
                      m.senderId === user.id &&
                      (m.status === 'seen' ? (
                        <img
                          className="img"
                          src={currentFriend.picture}
                          alt=""
                        />
                      ) : m.status === 'sent' ? (
                        <span>
                          <CheckCircleIcon
                            sx={{ width: '0.75em', height: '0.75em' }}
                          />
                        </span>
                      ) : (
                        <span>
                          <CheckCircleOutlineIcon
                            sx={{ width: '0.75em', height: '0.75em' }}
                          />
                        </span>
                      ))} */}
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
                      {moment(m.createdAt).startOf('mini').fromNow()}
                    </div>
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          <div className="friend_connect">
            <img src={currentFriend.picture} alt="" />
            <h3>
              {currentFriend.first_name} {currentFriend.last_name} đã kết nối
              với bạn
            </h3>
            <span>
              {moment(currentFriend.createdAt).startOf('mini').fromNow()}
            </span>
          </div>
        )}
      </div>

      {typingMessage &&
        typingMessage.msg &&
        typingMessage.senderId === currentFriend._id && (
          <div className="typing-message">
            <div className="fd-message">
              <div className="image-message-time">
                <img src={currentFriend.picture} alt="avatar-friend" />
                <div className="message-time">
                  <SyncLoader color="#36d7b7" size={5} speedMultiplier={0.8} />
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
}

Message.prototype = {
  currentFriend: PropTypes.object,
  typingMessage: PropTypes.object,
  scrollRef: PropTypes.node,
};

export default Message;
