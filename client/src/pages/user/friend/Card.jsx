import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  acceptRequest,
  cancelRequest,
  deleteRequest,
} from '../../../functions/friend';

function Card({ userr, user, type, getFriendPages }) {
  const handleCancelRequest = async (userId) => {
    const res = await cancelRequest(userId, user.token);
    if (res === 'ok') getFriendPages();
  };
  const handleAcceptRequest = async (userId) => {
    const res = await acceptRequest(userId, user.token);
    if (res === 'ok') getFriendPages();
  };
  const handleDeleteRequest = async (userId) => {
    const res = await deleteRequest(userId, user.token);
    if (res === 'ok') getFriendPages();
  };

  return (
    <div className="req_card">
      <Link to={`/profile/${userr.username}`}>
        <img src={userr.picture} alt="" />
      </Link>
      <div className="req_name">
        {userr.first_name} {userr.last_name}
      </div>
      {type === 'sent' ? (
        <button
          className="green_btn"
          onClick={() => handleCancelRequest(userr._id)}
        >
          Huỷ yêu cầu
        </button>
      ) : type === 'request' ? (
        <>
          <button
            className="green_btn"
            onClick={() => handleAcceptRequest(userr._id)}
          >
            Xác nhận
          </button>
          <button
            className="gray_btn"
            onClick={() => handleDeleteRequest(userr._id)}
          >
            Xoá
          </button>
        </>
      ) : (
        ''
      )}
    </div>
  );
}

Card.propTypes = {
  userr: PropTypes.object,
  user: PropTypes.object,
  type: PropTypes.string,
  getFriendPages: PropTypes.func,
};

export default Card;
