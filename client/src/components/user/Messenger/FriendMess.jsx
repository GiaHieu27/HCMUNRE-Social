import React from 'react';
import moment from 'moment';
import 'moment/locale/vi';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function FriendMess({ friend, userId, onlineFriends }) {
  moment.locale('vi');
  const { friendInfo, lastMessage } = friend;

  return (
    <div className="friend-mess scrollbar_mess">
      <div className="friend-image">
        <div className="image">
          <img src={friendInfo.picture} alt="" />
          {/* Hien thi dau cham xanh khi ban be online */}
          {onlineFriends &&
            onlineFriends.length > 0 &&
            onlineFriends.some(
              (friend) => friend.userId === friendInfo._id
            ) && <div className="active_icon"></div>}
        </div>
      </div>

      <div className="friend-name-seen">
        <div className="friend-name">
          <h4
            className={
              lastMessage?.senderId !== userId &&
              lastMessage?.status !== undefined &&
              lastMessage?.status !== 'seen'
                ? 'unseen_message Fd_name'
                : 'Fd_name'
            }
          >
            {friendInfo.first_name} {friendInfo.last_name}
          </h4>

          <div className="msg-time">
            {lastMessage && lastMessage.senderId === userId && (
              <span>Bạn: </span>
            )}

            {lastMessage && lastMessage.message.text ? (
              <span
                className={
                  lastMessage?.senderId !== userId &&
                  lastMessage?.status !== undefined &&
                  lastMessage?.status !== 'seen'
                    ? 'unseen_message'
                    : ''
                }
              >
                {`${lastMessage.message.text.slice(0, 10)} `}
              </span>
            ) : lastMessage && lastMessage.message.image ? (
              <span>đã gửi 1 hình ảnh </span>
            ) : (
              <span>đã kết nối với bạn </span>
            )}

            <span>
              {lastMessage
                ? moment(lastMessage.createdAt).startOf('mini').fromNow()
                : moment(friendInfo.createdAt).startOf('mini').fromNow()}
            </span>
          </div>
        </div>
        {/* start: hien thi trang thai tin nhan */}
        {userId === lastMessage?.senderId ? (
          <div className="seen-unseen-icon">
            {lastMessage.status === 'seen' ? (
              <img src={friendInfo.picture} alt="friend-seen-message" />
            ) : lastMessage.status === 'sent' ? (
              <div className="sent">
                <CheckCircleIcon
                  sx={{ width: '0.75em', height: '0.75em' }}
                  color="greyCustom"
                />
              </div>
            ) : (
              <div className="unseen">
                <CheckCircleOutlineIcon
                  sx={{ width: '0.75em', height: '0.75em' }}
                  color="greyCustom"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="seen-unseen-icon">
            {lastMessage?.status !== undefined &&
              lastMessage?.status !== 'seen' && (
                <div className="unseen-icon"></div>
              )}
          </div>
        )}
        {/* end: hien thi trang thai tin nhan */}
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
