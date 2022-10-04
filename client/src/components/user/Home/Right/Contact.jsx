import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriend } from '../../../../apis/friend';
import friendSlice from '../../../../redux/slices/friendsSlice';

function Contact() {
  const dispatch = useDispatch();
  const { user, friends: friendStore } = useSelector((state) => ({ ...state }));
  const friends = friendStore.data.friends;
  const actions = friendSlice.actions;

  useEffect(() => {
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
        friends.map((friend) => (
          <div className="contact hover3" key={friend._id}>
            <div className="contact_img">
              <img src={friend.picture} alt="" />
            </div>
            <span>
              {friend.first_name} {friend.last_name}
            </span>
          </div>
        ))}
    </>
  );
}

export default Contact;
