import React from 'react';
import moment from 'moment';
import 'moment/locale/vi';
import PropTypes from 'prop-types';

function FriendMess({ friend, userId, onlineFriends }) {
  moment.locale('vi');
  const { friendInfo, msgInfo } = friend;

  return (
    <div className="friend-mess">
      <div className="friend-image">
        <div className="image">
          <img src={friendInfo.picture} alt="" />

          {onlineFriends &&
          onlineFriends.length > 0 &&
          onlineFriends.some((friend) => friend.userId === friendInfo._id) ? (
            <div className="active_icon"></div>
          ) : (
            ''
          )}
        </div>
      </div>

      <div className="friend-name-seen">
        <div className="friend-name">
          <h4
            className={
              msgInfo?.senderId !== userId &&
              msgInfo?.status !== undefined &&
              msgInfo?.status !== 'seen'
                ? 'unseen_message Fd_name'
                : 'Fd_name'
            }
          >
            {friendInfo.first_name} {friendInfo.last_name}
          </h4>

          <div className="msg-time">
            {msgInfo && msgInfo.senderId === userId && <span>Bạn: </span>}

            {msgInfo && msgInfo.message.text ? (
              <span
                className={
                  msgInfo?.senderId !== userId &&
                  msgInfo?.status !== undefined &&
                  msgInfo?.status !== 'seen'
                    ? 'unseen_message'
                    : ''
                }
              >
                {`${msgInfo.message.text.slice(0, 10)} `}
              </span>
            ) : msgInfo && msgInfo.message.image ? (
              <span>đã gửi 1 hình ảnh </span>
            ) : (
              <span>đã kết nối với bạn </span>
            )}

            <span>
              {msgInfo
                ? moment(msgInfo.createdAt).startOf('mini').fromNow()
                : moment(friendInfo.createdAt).startOf('mini').fromNow()}
            </span>
          </div>
        </div>
        {/* {userId === msgInfo?.senderId ? (
          <div className="seen-unseen-icon">
            {msgInfo.status === 'seen' ? (
              <img src={friendInfo.picture} alt="seen-message" />
            ) : msgInfo.status === 'delivared' ? (
              <div className="delivared">
                {' '}
                <RiCheckboxCircleFill />
              </div>
            ) : (
              <div className="unseen">
                {' '}
                <HiOutlineCheckCircle />{' '}
              </div>
            )}
          </div>
        ) : (
          <div className="seen-unseen-icon">
            {msgInfo?.status !== undefined && msgInfo?.status !== 'seen' ? (
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
  onlineFriends: PropTypes.array,
  userId: PropTypes.string,
};

export default FriendMess;
