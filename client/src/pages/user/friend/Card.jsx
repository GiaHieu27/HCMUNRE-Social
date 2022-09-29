import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  acceptRequest,
  cancelRequest,
  deleteRequest,
  addFriend,
} from '../../../functions/friend';

function Card({ user, userStore, type, getFriendPages }) {
  const [suggest, setSuggest] = React.useState();

  const token = userStore.token;

  const handleCancelRequest = async (userId) => {
    const res = await cancelRequest(userId, token);
    if (res === 'ok') getFriendPages();
  };
  const handleAcceptRequest = async (userId) => {
    const res = await acceptRequest(userId, token);
    if (res === 'ok') getFriendPages();
  };
  const handleDeleteRequest = async (userId) => {
    const res = await deleteRequest(userId, token);
    if (res === 'ok') getFriendPages();
  };

  const handleAddingFriend = async (userId) => {
    const res = await addFriend(userId, token);
    if (res === 'ok') {
      getFriendPages();
    }
  };

  return (
    <div className="req_card">
      <Link to={`/profile/${user.username}`}>
        <img src={user.picture} alt="" />
      </Link>
      <div className="req_name">
        {user.first_name} {user.last_name}
      </div>
      {type === 'sent' ? (
        <button
          className="green_btn"
          onClick={() => handleCancelRequest(user._id)}
        >
          Huỷ yêu cầu
        </button>
      ) : type === 'request' ? (
        <>
          <button
            className="green_btn"
            onClick={() => handleAcceptRequest(user._id)}
          >
            Xác nhận
          </button>
          <button
            className="gray_btn"
            onClick={() => handleDeleteRequest(user._id)}
          >
            Xoá
          </button>
        </>
      ) : type === 'suggest' ? (
        <button
          className="green_btn"
          onClick={() => handleAddingFriend(user._id)}
        >
          Kết bạn
        </button>
      ) : (
        ''
      )}
    </div>
  );
}

Card.propTypes = {
  user: PropTypes.object,
  userStore: PropTypes.object,
  type: PropTypes.string,
  getFriendPages: PropTypes.func,
};

export default Card;
