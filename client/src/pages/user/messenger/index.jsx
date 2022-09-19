import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import axios from 'axios';

import Header from '../../../components/user/Header';
import FriendMess from '../../../components/user/Messenger/FriendMess';
import RightSide from '../../../components/user/Messenger/RightSide';
import friendsSlice from '../../../redux/slices/friendsSlice';
import messengerSlice from '../../../redux/slices/messengerSlice';
import { getFriend } from '../../../functions/friend';

function Messenger() {
  const { user, friends: friendStore } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();
  const { username } = useParams();
  const userName = username === undefined ? user.username : username;

  const friends = friendStore.data.friends;
  const actions = friendsSlice.actions;

  const [currentFriend, setCurrentFriend] = React.useState();
  const [newMessage, setNewMessage] = React.useState('');

  // ham dung hook nen khong tach ra file khac duoc
  const messageSend = async (dataMessage, token) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/messageSend`,
        { dataMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(messengerSlice.actions.MESSAGE_SEND_SUCCESS(data));
    } catch (error) {
      return error.response.data.message;
    }
  };

  const getAllMessage = async (id, token) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getMessage/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(messengerSlice.actions.MESSAGE_GET_SUCCESS(data));
    } catch (error) {
      return error.response.data.message;
    }
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
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

  const handleSendMessagePressEnter = async (e) => {
    if (e.key === 'Enter' && newMessage) {
      const dataMessage = {
        senderName: userName,
        receiverId: currentFriend._id,
        message: newMessage ? newMessage : '❤️',
      };

      await messageSend(dataMessage, user.token);
      setNewMessage('');
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

  React.useEffect(() => {
    getAllMessage(currentFriend?._id, user.token);
  }, [currentFriend?._id, user.token]);

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
              handleSendMessagePressEnter={handleSendMessagePressEnter}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Messenger;
