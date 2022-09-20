import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';

import Header from '../../../components/user/Header';
import FriendMess from '../../../components/user/Messenger/FriendMess';
import RightSide from '../../../components/user/Messenger/RightSide';
import friendsSlice from '../../../redux/slices/friendsSlice';
import messengerSlice from '../../../redux/slices/messengerSlice';
import { getFriend } from '../../../functions/friend';
import dataURLtoBlob from '../../../helpers/dataURLtoBlob';
import uploadImages from '../../../functions/uploadImages';

function Messenger() {
  const {
    user,
    friends: friendStore,
    messenger: { messageSendSuccess, message, message_get_success },
  } = useSelector((state) => ({ ...state }));
  const friends = friendStore.data.friends;

  const dispatch = useDispatch();
  const { username } = useParams();
  const userName = username === undefined ? user.username : username;

  const actionsFriend = friendsSlice.actions;
  const actionsMessenger = messengerSlice.actions;

  const [typingMessage, setTypingMessage] = React.useState('');
  const [newMessage, setNewMessage] = React.useState('');
  const [socketMessage, setSocketMessage] = React.useState('');
  const [currentFriend, setCurrentFriend] = React.useState();
  const [imageMessage, setImageMessage] = React.useState();
  const [activeUser, setActiveUser] = React.useState([]);
  const [showToast, setShowToast] = React.useState(false);

  const scrollRef = React.useRef(null);
  const socketRef = React.useRef(null);

  // start socket
  React.useEffect(() => {
    socketRef.current = io('ws://localhost:8000');

    socketRef.current.on('getMessage', (data) => {
      console.log(data);
      setSocketMessage(data);
    });

    socketRef.current.on('typingMessageGet', (data) => {
      console.log(data);
      setTypingMessage(data);
    });
  }, []);

  React.useEffect(() => {
    socketRef.current.emit('addUser', user.id, user);
  }, []);

  React.useEffect(() => {
    socketRef.current.on('getUser', (socketUsers) => {
      const filterUser = socketUsers.filter(
        (socketUser) => socketUser.userId !== user.id
      );
      setActiveUser(filterUser);
    });
  }, []);

  React.useEffect(() => {
    if (messageSendSuccess) {
      setTimeout(() => {
        socketRef.current.emit('sendMessage', message[message.length - 1]);
      }, 500);
      // dispatch({
      //   type: 'UPDATE_FRIEND_MESSAGE',
      //   payload: {
      //     msgInfo: message[message.length - 1],
      //   },
      // });
      dispatch(actionsMessenger.MESSAGE_SEND_SUCCESS_CLEAR());
    }
  }, [messageSendSuccess]);

  React.useEffect(() => {
    if (socketMessage && currentFriend) {
      if (
        socketMessage.senderId === currentFriend._id &&
        socketMessage.receiverId === user.id
      ) {
        dispatch(actionsMessenger.SOCKET_MESSAGE(socketMessage));
        // seenMessage(socketMessage, user.token);
        // socketRef.current.emit('messageSeen', socketMessage);
        // dispatch({
        //   type: 'UPDATE_FRIEND_MESSAGE',
        //   payload: {
        //     msgInfo: socketMessage,
        //     status: 'seen',
        //   },
        // });
      }
    }
    setSocketMessage('');
  }, [socketMessage]);

  console.log(socketMessage);

  React.useEffect(() => {
    if (
      socketMessage &&
      socketMessage.senderId !== currentFriend._id &&
      socketMessage.receiverId === user.id
    ) {
      // notificationSPlay();
      // toast.success(`${socketMessage.senderName} send a new message`);
      console.log('object');
      setShowToast(true);
      // updateMessage(socketMessage, user.token);
      // socketRef.current.emit('delivaredMessage', socketMessage);
      // dispatch({
      //   type: 'UPDATE_FRIEND_MESSAGE',
      //   payload: {
      //     msgInfo: socketMessage,
      //     status: 'delivared',
      //   },
      // });
    }
  }, [socketMessage]);

  // end socket

  // ham dung hook nen khong tach ra file khac duoc
  // Api
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
      dispatch(actionsMessenger.MESSAGE_SEND_SUCCESS(data));
    } catch (error) {
      return error.response.data.message;
    }
  };

  const getAllMessage = React.useCallback(
    async (id, token) => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/getMessage/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(actionsMessenger.MESSAGE_GET_SUCCESS(data));
      } catch (error) {
        return error.response.data.message;
      }
    },
    [dispatch, actionsMessenger]
  );

  const ImageMessageSend = async (sender, receiverId, img, token) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/messageSendImage`,
        { sender, receiverId, img },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(actionsMessenger.MESSAGE_SEND_SUCCESS(data));
    } catch (error) {
      return error.response.data.message;
    }
  };
  // End api

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);

    socketRef.current.emit('typingMessage', {
      senderId: user.id,
      receiverId: currentFriend._id,
      msg: e.target.value,
    });
  };

  const handleSendMessage = async () => {
    // e.preventDefault();
    if (!imageMessage) {
      const dataMessage = {
        senderName: userName,
        receiverId: currentFriend._id,
        message: newMessage ? newMessage : '❤️',
      };

      socketRef.current.emit('typingMessage', {
        senderId: user.id,
        receiverId: currentFriend._id,
        msg: '',
      });

      await messageSend(dataMessage, user.token);
      setNewMessage('');
    } else {
      const img = dataURLtoBlob(imageMessage);
      const path = `${user.username}/message_images`;
      let formData = new FormData();
      formData.append('path', path);
      formData.append('file', img);
      const imgMes = await uploadImages(formData, user.token);
      await ImageMessageSend(
        userName,
        currentFriend._id,
        imgMes.images[0].url,
        user.token
      );
      setImageMessage('');
    }
  };

  const handleSendMessagePressEnter = async (e) => {
    if (e.key === 'Enter' && newMessage) {
      const dataMessage = {
        senderName: userName,
        receiverId: currentFriend._id,
        message: newMessage ? newMessage : '❤️',
      };

      socketRef.current.emit('typingMessage', {
        senderId: user.id,
        receiverId: currentFriend._id,
        msg: '',
      });

      await messageSend(dataMessage, user.token);
      setNewMessage('');
    }
  };

  React.useEffect(() => {
    const getFriendPages = async () => {
      dispatch(actionsFriend.FRIEND_REQUEST());
      const res = await getFriend(user.token);
      if (res.success === true) {
        dispatch(actionsFriend.FRIEND_SUCCESS(res.data));
      } else {
        dispatch(actionsFriend.FRIEND_ERROR(res.data));
      }
    };
    getFriendPages();
  }, [actionsFriend, dispatch, user.token]);

  React.useEffect(() => {
    if (friends && friends.length > 0) {
      setCurrentFriend(friends[0]);
    }
  }, [friends]);

  React.useEffect(() => {
    getAllMessage(currentFriend?._id, user.token);
  }, [currentFriend?._id, user.token, getAllMessage]);

  React.useEffect(() => {
    scrollRef.current?.scrollIntoView({
      block: 'end',
      inline: 'nearest',
    });
  }, [message]);

  return (
    <>
      <Header />
      <Snackbar
        autoHideDuration={6000}
        message={
          showToast && `${socketMessage.senderName} đã gửi một tin nhắn mới`
        }
        open={showToast}
        onClose={() => setShowToast(false)}
      />
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
                        <FriendMess
                          friend={friend}
                          userId={user.id}
                          activeUser={activeUser}
                        />
                      </div>
                    ))
                  : 'No friends'}
              </div>
            </div>
          </div>

          {currentFriend && (
            <RightSide
              handleSendMessagePressEnter={handleSendMessagePressEnter}
              handleInputChange={handleInputChange}
              handleSendMessage={handleSendMessage}
              setImageMessage={setImageMessage}
              setNewMessage={setNewMessage}
              typingMessage={typingMessage}
              currentFriend={currentFriend}
              imageMessage={imageMessage}
              newMessage={newMessage}
              activeUser={activeUser}
              scrollRef={scrollRef}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Messenger;
