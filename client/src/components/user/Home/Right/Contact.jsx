import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFriend, addFriend } from '../../../../apis/friend';
import friendSlice from '../../../../redux/slices/friendsSlice';

function Contact() {
  const dispatch = useDispatch();
  const { user, friends: friendStore } = useSelector((state) => ({ ...state }));
  const friends = friendStore.data.suggestFriends;
  const actions = friendSlice.actions;

  React.useEffect(() => {
    const getFriendPages = async () => {
      dispatch(actions.FRIEND_REQUEST());
      const res = await getFriend(user.token);
      if (res.success === true) {
        dispatch(actions.FRIEND_SUCCESS(res.data));
      } else {
        dispatch(actions.FRIEND_ERROR(res.data));
      }
    };
    getFriendPages();
  }, [actions, dispatch, user.token]);

  return (
    <>
      {friends &&
        friends.length > 0 &&
        friends.slice(0, 2).map((friend) => (
          <div className="createPost contact flex-column" key={friend._id}>
            <div className="d-flex align-items-center gap-2">
              <div className="contact_img">
                <img src={friend.picture} alt="" />
              </div>
              <span>
                {friend.first_name} {friend.last_name}
              </span>
            </div>

            <div className="contact_action d-flex flex-row justify-content-around">
              <div className="green_btn">Kết bạn</div>
              <Link to={`/profile/${friend.username}`} className="gray_btn">
                Trang cá nhân
              </Link>
            </div>
          </div>
        ))}
    </>
  );
}

export default Contact;
