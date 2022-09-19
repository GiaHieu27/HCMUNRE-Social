import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import Header from '../../../components/user/Header';
import FriendMess from '../../../components/user/Messenger/FriendMess';
import RightSide from '../../../components/user/Messenger/RightSide';
import friendsSlice from '../../../redux/slices/friendsSlice';
import { getFriend } from '../../../functions/friend';
import { messageSend } from '../../../functions/messenger';

function Messenger() {
  const { user, friends: friendStore } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();
  const { username } = useParams();
  const userName = username === undefined ? user.username : username;

  const friends = friendStore.data.friends;
  const actions = friendsSlice.actions;

  const [currentFriend, setCurrentFriend] = React.useState();
  const [newMessage, setNewMessage] = React.useState('');

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    console.log(newMessage);
    // if (!imageMessage) {
    const dataMessage = {
      senderName: userName,
      receiverId: currentFriend._id,
      message: newMessage ? newMessage : '❤️',
    };

    // socketRef.current.emit('typingMessage', {
    //   senderId: user.id,
    //   receiverId: currentFriend._id,
    //   msg: '',
    // });
    await messageSend(dataMessage, user.token);
    setNewMessage('');
    // } else {
    // const img = dataURItoBlob(imageMessage);
    // const path = `${user.username}/message_images`;
    // let formData = new FormData();
    // formData.append('path', path);
    // formData.append('file', img);
    // const imgMes = await uploadImages(formData, path, user.token);
    // await ImageMessageSend(
    //   userName,
    //   currentFriend._id,
    //   imgMes[0].url,
    //   user.token
    // );
    // setImageMessage('');
    // }
  };

  const handleSendMessageEnter = (e) => {
    if (e.key === 'Enter' && newMessage) {
      console.log(newMessage);
    }
  };

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

  React.useEffect(() => {
    if (friends && friends.length > 0) {
      setCurrentFriend(friends[0]);
    }
  }, [friends]);

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
                {friends && friends.length
                  ? friends.map((friend) => (
                      <div
                        className={
                          currentFriend?._id === friend?._id
                            ? 'hover-friend active1'
                            : 'hover-friend hover1'
                        }
                        onClick={() => setCurrentFriend(friend)}
                        key={friend._id}
                      >
                        <FriendMess friend={friend} userId={user.id} />
                      </div>
                    ))
                  : 'No friends'}
              </div>
            </div>
          </div>

          {currentFriend && (
            <RightSide
              currentFriend={currentFriend}
              handleInputChange={handleInputChange}
              newMessage={newMessage}
              handleSendMessage={handleSendMessage}
              handleSendMessageEnter={handleSendMessageEnter}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Messenger;
