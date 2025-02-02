import { useState, useRef, useContext, useEffect } from 'react';
import useClickOutSide from '../../../hooks/useClickOutSide';
import { ProfileContext } from '../../../context/profileContext';
import * as functions from '../../../apis/friend';

function Friendship() {
  const { profile, user } = useContext(ProfileContext);
  const profileId = profile._id;
  const userToken = user.token;

  const [friendMenu, setFriendMenu] = useState(false);
  const [reponseMenu, setRespondMenu] = useState(false);

  const menuRef = useRef(null);
  const responseRef = useRef(null);

  useClickOutSide(menuRef, () => setFriendMenu(false));
  useClickOutSide(responseRef, () => setRespondMenu(false));

  const [friendship, setFriendship] = useState(profile.friendship);
  useEffect(() => {
    setFriendship(profile.friendship);
  }, [profile.friendship]);

  const handleAddFriend = async () => {
    setFriendship({ ...friendship, requestSent: true, following: true });
    await functions.addFriend(profileId, userToken);
  };

  const handleCancelRequest = async () => {
    setFriendship({ ...friendship, requestSent: false, following: false });
    await functions.cancelRequest(profileId, userToken);
  };

  const handleFollow = async () => {
    setFriendship({ ...friendship, following: true });
    await functions.follow(profileId, userToken);
  };

  const handleUnFollow = async () => {
    setFriendship({ ...friendship, following: false });
    await functions.unfollow(profileId, userToken);
  };

  const handleAcceptRequest = async () => {
    setFriendship({
      ...friendship,
      following: true,
      friends: true,
      requestReceived: false,
      requestSent: false,
    });
    await functions.acceptRequest(profileId, userToken);
  };

  const handleDeleteRequest = async () => {
    setFriendship({
      ...friendship,
      requestReceived: false,
      requestSent: false,
    });
    await functions.deleteRequest(profileId, userToken);
  };

  const handleUnFriend = async () => {
    setFriendship({
      ...friendship,
      following: false,
      friends: false,
    });
    await functions.unfriend(profileId, userToken);
  };

  return (
    <div className="friendship">
      {friendship?.friends ? (
        <div className="friends_menu_wrap">
          <button className="gray_btn" onClick={() => setFriendMenu(true)}>
            <img src="/icons/friends.png" alt="" />
            <span>Bạn bè</span>
          </button>
          {friendMenu && (
            <div className="open_cover_menu" ref={menuRef}>
              <div className="open_cover_menu_item hover1">
                <img src="/icons/favoritesOutline.png" alt="" />
                Yêu thích
              </div>
              <div className="open_cover_menu_item hover1">
                <img src="/icons/editFriends.png" alt="" />
                Điều chỉnh danh sách bạn bè
              </div>
              {friendship?.following ? (
                <div
                  className="open_cover_menu_item hover1"
                  onClick={() => handleUnFollow()}
                >
                  <img src="/icons/unfollowOutlined.png" alt="" />
                  Huỷ theo dõi
                </div>
              ) : (
                <div
                  className="open_cover_menu_item hover1"
                  onClick={() => handleFollow()}
                >
                  <img src="/icons/unfollowOutlined.png" alt="" />
                  Theo dõi
                </div>
              )}
              <div
                className="open_cover_menu_item hover1"
                onClick={() => handleUnFriend()}
              >
                <i className="unfriend_outlined_icon"></i>
                Huỷ kết bạn
              </div>
            </div>
          )}
        </div>
      ) : (
        !friendship?.requestSent &&
        !friendship?.requestReceived && (
          <button className="green_btn" onClick={() => handleAddFriend()}>
            <img src="/icons/addFriend.png" alt="" className="invert" />
            <span>Kết bạn</span>
          </button>
        )
      )}
      {friendship?.requestSent ? (
        <button className="green_btn" onClick={() => handleCancelRequest()}>
          <img src="/icons/cancelRequest.png" alt="" className="invert" />
          <span>Huỷ yêu cầu</span>
        </button>
      ) : (
        friendship?.requestReceived && (
          <div className="friends_menu_wrap">
            <button
              className="green_btn"
              onClick={() => setRespondMenu(!reponseMenu)}
            >
              <img src="/icons/friends.png" alt="" className="invert" />
              <span>Phản hồi</span>
            </button>
            {reponseMenu && (
              <div className="open_cover_menu" ref={responseRef}>
                <div
                  className="open_cover_menu_item hover1"
                  onClick={() => handleAcceptRequest()}
                >
                  Xác nhận
                </div>
                <div
                  className="open_cover_menu_item hover1"
                  onClick={() => handleDeleteRequest()}
                >
                  Xoá
                </div>
              </div>
            )}
          </div>
        )
      )}

      <div className="flex">
        {friendship?.following ? (
          <button className="gray_btn" onClick={() => handleUnFollow()}>
            <img src="/icons/follow.png" alt="" />
            <span>Đang theo dõi</span>
          </button>
        ) : (
          <button className="green_btn" onClick={() => handleFollow()}>
            <img src="/icons/follow.png" alt="" className="invert" />
            <span>Theo dõi</span>
          </button>
        )}

        <button className={friendship?.friends ? 'green_btn' : 'gray_btn'}>
          <img
            src="/icons/message.png"
            alt=""
            className={friendship?.friends ? 'invert' : ''}
          />
          <span>Nhắn tin</span>
        </button>
      </div>
    </div>
  );
}

export default Friendship;
