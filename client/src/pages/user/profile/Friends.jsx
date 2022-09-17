import { Link } from 'react-router-dom';

function Friends({ friends }) {
  let year = new Date().getFullYear();

  return (
    <div className="wrap">
      <div className="profile_card">
        <div className="profile_card_header">
          Bạn bè
          <div className="profile_header_link">Xem tất cả bạn bè</div>
        </div>

        {friends && (
          <div className="profile_header_count">
            {friends.length === 0
              ? ''
              : friends.length === 1
              ? '1 bạn bè'
              : friends.length > 1
              ? `${friends.length} bạn bè`
              : ''}
          </div>
        )}
        <div className="profile_card_grid">
          {friends &&
            friends.slice(0.9).map((friend) => (
              <Link
                to={`/profile/${friend.username}`}
                className="profile_photo_card"
                key={friend._id}
              >
                <img src={friend.picture} alt="friend_picture" />
                <span>
                  {friend.first_name} {friend.last_name}
                </span>
              </Link>
            ))}
        </div>
      </div>
      <div className="relative_fb_copyright mx-2 fw-semibold">
        {`HCMUNRE @ ${year}`}
      </div>
    </div>
  );
}

export default Friends;
