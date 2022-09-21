import PropTypes from 'prop-types';
// import moment from 'moment';

function FriendMess({ friend, userId, activeUser }) {
  return (
    <div className="friend-mess">
      <div className="friend-image">
        <div className="image">
          <img src={friend?.friendInfo.picture} alt="" />

          {activeUser &&
          activeUser.length > 0 &&
          activeUser.some((user) => user.userId === friend.friendInfo._id) ? (
            <div className="active_icon"></div>
          ) : (
            ''
          )}
        </div>
      </div>

      <div className="friend-name-seen">
        <div className="friend-name">
          {/* <h4
          className={
            friend?.msgInfo?.senderId !== userId &&
            friend?.msgInfo?.status !== undefined &&
            friend?.msgInfo?.status !== 'seen'
              ? 'unseen_message Fd_name'
              : 'Fd_name'
          }
          >
            {friend?.friendInfo.first_name} {friend?.friendInfo.last_name}
          </h4> */}
          <h4>
            {friend.friendInfo.first_name} {friend.friendInfo.last_name}
          </h4>
          {/* <div className="msg-time">
            {friend?.msgInfo && friend?.msgInfo.senderId === userId ? (
              <span>Bạn </span>
            ) : (
              <span
                className={
                  friend?.msgInfo?.senderId !== userId &&
                  friend?.msgInfo?.status !== undefined &&
                  friend?.msgInfo?.status !== 'seen'
                    ? 'unseen_message'
                    : ''
                }
              >
                {`${friend?.friendInfo.first_name} ${friend?.friendInfo.last_name} `}
              </span>
            )}

            {friend?.msgInfo && friend?.msgInfo.message.text ? (
              <span
                className={
                  friend?.msgInfo?.senderId !== userId &&
                  friend?.msgInfo?.status !== undefined &&
                  friend?.msgInfo?.status !== 'seen'
                    ? 'unseen_message'
                    : ''
                }
              >
                {`${friend?.msgInfo.message.text.slice(0, 10)} `}
              </span>
            ) : friend?.msgInfo && friend?.msgInfo.message.image ? (
              <span>send a image </span>
            ) : (
              <span>connect you </span>
            )}

            <span>
              {friend?.msgInfo
                ? moment(friend?.msgInfo.createdAt).startOf('mini').fromNow()
                : moment(friend?.friendInfo.createdAt).startOf('mini').fromNow()}
            </span>
          </div> */}
        </div>
        {/* {userId === friend?.msgInfo?.senderId ? (
          <div className="seen-unseen-icon">
            {friend?.msgInfo.status === 'seen' ? (
              <img src={friend?.friendInfo.picture} alt="seen-message" />
            ) : friend?.msgInfo.status === 'delivared' ? (
              <div className="delivared"> <RiCheckboxCircleFill /></div>
            ) : (
              <div className="unseen"> <HiOutlineCheckCircle /></div>
            )}
          </div>
        ) : (
          <div className="seen-unseen-icon">
            {friend?.msgInfo?.status !== undefined &&
            friend?.msgInfo?.status !== 'seen' ? (
              <div className="seen-icon"></div>
            ) : (
              ''
            )}
          </div>
        )} */}
      </div>
    </div>
  );
}

FriendMess.prototype = {
  friend: PropTypes.object,
  activeUser: PropTypes.array,
  userId: PropTypes.string,
};

export default FriendMess;
