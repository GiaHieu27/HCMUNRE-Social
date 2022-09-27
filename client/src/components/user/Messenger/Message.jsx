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

  return (
    <>
      <div className="message-show">
        {message && message.length > 0 ? (
          message.map((m, index) =>
            // hien thi tin nhan ben nguoi gui
            m.senderId === user.id ? (
              <div key={index} className="my-message" ref={scrollRef}>
                <div className="image-message">
                  <div className="my-text">
                    {m.message.text === '' ? (
                      <div
                        className="message-text my"
                        style={{ background: 'none' }}
                      >
                        <img src={m.message.image} alt="" />
                      </div>
                    ) : (
                      <p className="message-text my">{m.message.text}</p>
                    )}
                    {/*start: Hien thi trang thai tin nhan khi gui */}
                    {index === message.length - 1 &&
                      m.senderId === user.id &&
                      (m.status === 'seen' ? (
                        <img
                          className="img"
                          src={currentFriend.picture}
                          alt=""
                        />
                      ) : m.status === 'sent' ? (
                        <CheckCircleIcon
                          sx={{ width: '0.75em', height: '0.75em' }}
                          color="greyCustom"
                        />
                      ) : (
                        <CheckCircleOutlineIcon
                          sx={{ width: '0.75em', height: '0.75em' }}
                          color="greyCustom"
                        />
                      ))}
                    {/*end Hien thi trang thai tin nhan khi gui */}
                  </div>
                </div>
                {index === message.length - 1 && (
                  <div className="time">
                    {moment(m.createdAt).startOf('mini').fromNow()}
                  </div>
                )}
              </div>
            ) : (
              // hien thi tin nhan ben nguoi nhan
              <div key={index} className="fd-message" ref={scrollRef}>
                <div className="image-message-time">
                  <img src={currentFriend.picture} alt="avatar_friend" />
                  <div className="message-time">
                    <div className="fd-text">
                      {m.message.text === '' ? (
                        <div className="message-text fd">
                          <img src={m.message.image} alt="" />
                        </div>
                      ) : (
                        <p className="message-text fd">{m.message.text}</p>
                      )}
                    </div>
                    {index === message.length - 1 && (
                      <div className="time">
                        {moment(m.createdAt).startOf('mini').fromNow()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          // hien thi khi hai ben chua nhan tin voi nhau
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
      {/* Hien thi khi nguoi gui dang nhap tin nhan */}
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
