import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import Header from '../../../components/user/Header';
import Card from './Card';
import friendsSlice from '../../../redux/slices/friendsSlice';
import { getFriend } from '../../../functions/friend';

function Friend() {
  const { user, friends } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();
  const { type } = useParams();

  const getFriendPages = useCallback(async () => {
    dispatch(friendsSlice.actions.FRIEND_REQUEST());
    const res = await getFriend(user.token);
    if (res.success === true)
      dispatch(friendsSlice.actions.FRIEND_SUCCESS(res.data));
    else dispatch(friendsSlice.actions.FRIEND_ERROR(res.data));
  }, [dispatch, user.token]);

  useEffect(() => {
    getFriendPages();
  }, [getFriendPages]);

  return (
    <>
      <Header page="friends" />
      <div className="friends">
        <div className="friends_left">
          <div className="friends_left_header">
            <h3>Bạn bè</h3>
            <div className="small_circle me-1">
              <i className="settings_filled_icon"></i>
            </div>
          </div>

          <div className="friends_left_wrap">
            <Link
              to="/friends"
              className={`mmenu_item hover3 ${
                type === undefined && 'mmenu_item active_friends'
              }`}
            >
              <div className="small_circle">
                <i className="friends_home_icon"></i>
              </div>
              <span>Trang chủ</span>
            </Link>

            <Link
              to="/friends/requests"
              className={`mmenu_item hover3 ${
                type === 'requests' && 'mmenu_item active_friends'
              }`}
            >
              <div className="small_circle">
                <i className="friends_requests_icon"></i>
              </div>
              <span>Yêu cầu kết bạn</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>

            <Link
              to="/friends/sent"
              className={`mmenu_item hover3 ${
                type === 'sent' && 'mmenu_item active_friends'
              }`}
            >
              <div className="small_circle">
                <i className="friends_requests_icon"></i>
              </div>
              <span>Lời mời kết bạn</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>

            <div className="mmenu_item hover3">
              <div className="small_circle">
                <i className="friends_suggestions_icon"></i>
              </div>
              <span>Gợi ý</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>

            <Link
              to="/friends/all"
              className={`mmenu_item hover3 ${
                type === 'all' && 'mmenu_item active_friends'
              }`}
            >
              <div className="small_circle">
                <i className="all_friends_icon"></i>
              </div>
              <span>Tất cả bạn bè</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>
          </div>
        </div>

        <div className="friends_right">
          {(type === undefined || type === 'requests') && (
            <div className="friends_right_wrap">
              <div className="friends_left_header">
                <h3>Yêu cầu kết bạn</h3>
                {type === undefined && (
                  <Link to="/friends/requests" className="see_link hover3">
                    Xem tất cả
                  </Link>
                )}
              </div>
              <div className="flex_wrap">
                {friends.data.requests &&
                  friends.data.requests.map((userr) => (
                    <Card
                      key={userr._id}
                      userr={userr}
                      user={user}
                      getFriendPages={getFriendPages}
                      type="request"
                    />
                  ))}
              </div>
            </div>
          )}

          {(type === undefined || type === 'sent') && (
            <div className="friends_right_wrap">
              <div className="friends_left_header">
                <h3>Lời mời kết bạn</h3>
                {type === undefined && (
                  <Link to="/friends/sent" className="see_link hover3">
                    Xem tất cả
                  </Link>
                )}
              </div>
              <div className="flex_wrap">
                {friends.data.sentRequests &&
                  friends.data.sentRequests.map((userr) => (
                    <Card
                      key={userr._id}
                      userr={userr}
                      user={user}
                      getFriendPages={getFriendPages}
                      type="sent"
                    />
                  ))}
              </div>
            </div>
          )}

          {(type === undefined || type === 'all') && (
            <div className="friends_right_wrap">
              <div className="friends_left_header">
                <h3>Tất cả bạn bè</h3>
                {type === undefined && (
                  <Link to="/friends/all" className="see_link hover3">
                    Xem tất cả
                  </Link>
                )}
              </div>
              <div className="flex_wrap">
                {friends.data.friends &&
                  friends.data.friends.map((userr) => (
                    <Card
                      key={userr._id}
                      userr={userr}
                      user={user}
                      getFriendPages={getFriendPages}
                      type="friend"
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Friend;
