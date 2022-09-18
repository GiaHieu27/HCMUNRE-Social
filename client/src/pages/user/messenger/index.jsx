import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import Header from '../../../components/user/Header';
import FriendMess from '../../../components/user/Messenger/FriendMess';
import RightSide from '../../../components/user/Messenger/RightSide';
import friendsSlice from '../../../redux/slices/friendsSlice';
import { getFriend } from '../../../functions/friend';

function Messenger() {
  const dispatch = useDispatch();

  const { user, friends: friendStore } = useSelector((state) => ({ ...state }));
  const friends = friendStore.data.friends;
  const actions = friendsSlice.actions;

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
      <Header />
      <div className={'messenger'}>
        <div className="row-custom">
          <div className="col-3">
            <div className="left-side">
              <div className="top">
                <div className="image-name">
                  <div className="image">
                    <img src={user.picture} alt="" />
                  </div>
                  <div className="name">
                    <h3>Nhắn tin</h3>
                  </div>
                </div>

                <div className="icons">
                  <div className="icon">
                    <MoreHorizIcon />
                  </div>

                  {/* {visible && (
                    <div className="theme_logout">
                      <h3>Dark Mode</h3>
                      <div className="on">
                        <label htmlFor="dark">ON</label>
                        <input
                          onChange={(e) => themeSet(e.target.value)}
                          value="dark"
                          type="radio"
                          name="theme"
                          id="dark"
                        />
                      </div>
  
                      <div className="of">
                        <label htmlFor="white">OFF</label>
                        <input
                          onChange={(e) => themeSet(e.target.value)}
                          value="white"
                          type="radio"
                          name="theme"
                          id="white"
                        />
                      </div>
                    </div>
                  )} */}
                </div>
              </div>
              <div className="friend-search">
                <div className="search">
                  <SearchIcon color="success" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm trong tin nhắn"
                    className="form-control-cus"
                  />
                </div>
              </div>

              <div className="friends-mess">
                <div className="hover-friend">
                  {friends && friends.length
                    ? friends.map((friend) => (
                        <div
                          className={'hover-friend'}
                          // onClick={() => setCurrentFriend(friend.fndInfo)}
                          // key={friend.fndInfo._id}
                        >
                          <FriendMess friend={friend} userId={user.id} />
                        </div>
                      ))
                    : 'No friends'}
                </div>
              </div>
            </div>
          </div>

          <RightSide />
        </div>
      </div>
    </>
  );
}

export default Messenger;
