import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import { Stack } from '@mui/material';

import { getFriend, addFriend } from '../../../../apis/friend';
import friendSlice from '../../../../redux/slices/friendsSlice';

function Contact() {
  const dispatch = useDispatch();
  const { user, friends: friendStore } = useSelector((state) => ({ ...state }));
  const actions = friendSlice.actions;

  const [friends, setFriends] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleAddFriend = async (friendId, token) => {
    const res = await addFriend(friendId, token);
    if (res === 'ok') {
      setFriends((prev) => prev.filter((friend) => friend._id !== friendId));
    }
  };

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        dispatch(actions.FRIEND_REQUEST());
        const res = await getFriend(user.token);
        if (res.success === true) {
          dispatch(actions.FRIEND_SUCCESS(res.data));
          setLoading(false);
        } else {
          dispatch(actions.FRIEND_ERROR(res.data));
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [actions, dispatch, user.token]);

  React.useEffect(() => {
    setFriends(friendStore.data.suggestFriends);
  }, [friendStore.data.suggestFriends]);

  return (
    <>
      {!loading ? (
        friends.slice(0, 2).map((friend) => (
          <div className='createPost contact flex-column' key={friend._id}>
            <div className='d-flex align-items-center gap-2'>
              <div className='contact_img'>
                <img src={friend.picture} alt='' />
              </div>
              <span>
                {friend.first_name} {friend.last_name}
              </span>
            </div>

            <div className='contact_action d-flex flex-row justify-content-around'>
              <button
                className='green_btn'
                onClick={() => handleAddFriend(friend._id, user.token)}
              >
                Kết bạn
              </button>
              <Link to={`/profile/${friend.username}`} className='gray_btn'>
                Trang cá nhân
              </Link>
            </div>
          </div>
        ))
      ) : (
        <>
          {Array.from(new Array(2), (val, index) => index + 1).map((val, i) => (
            <div className='createPost contact flex-column' key={i}>
              <Stack
                spacing={1}
                direction='row'
                justifyContent='flex-start'
                alignItems='center'
              >
                <Skeleton variant='circular' width={40} height={40} />
                <Skeleton width={70} height={30} />
              </Stack>
              <Stack spacing={2} direction='row'>
                <Skeleton variant='rounded' width={190} height={40} />
                <Skeleton variant='rounded' width={190} height={40} />
              </Stack>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default Contact;
