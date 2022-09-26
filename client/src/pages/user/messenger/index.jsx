import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import toast, { Toaster } from 'react-hot-toast';
import useSound from 'use-sound';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import Header from '../../../components/user/Header';
import FriendMess from '../../../components/user/Messenger/FriendMess';
import RightSide from '../../../components/user/Messenger/RightSide';
import friendsSlice from '../../../redux/slices/friendsSlice';
import messengerSlice from '../../../redux/slices/messengerSlice';
import dataURLtoBlob from '../../../helpers/dataURLtoBlob';
import uploadImages from '../../../functions/uploadImages';
import notificationSound from '../../../audio/notification.mp3';
import * as messengerApis from '../../../functions/messenger';
import { getFriend } from '../../../functions/friend';

function Messenger() {
  const {
    user,
    friends: friendStore,
    messenger: { messageSendSuccess, message, messageGetSuccess, addNewUser },
  } = useSelector((state) => ({ ...state }));
  const friends = friendStore.data.friendMessenger;

  const dispatch = useDispatch();
  const { username } = useParams();
  const userName = username === undefined ? user.username : username;

  const friendActions = friendsSlice.actions;
  const messengerActions = messengerSlice.actions;
  const token = user.token;
  const [notificationSPlay] = useSound(notificationSound);

  const [typingMessage, setTypingMessage] = React.useState('');
  const [newMessage, setNewMessage] = React.useState('');
  const [displayMessageToFriend, setDisplayMessageToFriend] = React.useState();
  const [currentFriend, setCurrentFriend] = React.useState();
  const [imageMessage, setImageMessage] = React.useState();
  const [onlineFriends, setOnlineFriends] = React.useState([]);

  const scrollRef = React.useRef(null);
  const socketRef = React.useRef(null);

  const handleChangeInput = (e) => {
    setNewMessage(e.target.value);

    socketRef.current.emit('typingMessage', {
      senderId: user.id,
      receiverId: currentFriend._id,
      msg: e.target.value,
    });
  };

  const handleSendingMessage = async () => {
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

      await messengerApis.messageSend(dataMessage, token, dispatch);
      setNewMessage('');
    } else {
      const img = dataURLtoBlob(imageMessage);
      const path = `${user.username}/message_images`;

      let formData = new FormData();
      formData.append('path', path);
      formData.append('file', img);

      const imgMes = await uploadImages(formData, token);
      await messengerApis.imageMessageSend(
        userName,
        currentFriend._id,
        imgMes.images[0].url,
        token,
        dispatch
      );
      setImageMessage('');
    }
  };

  const handleSendingMessageByPressingEnter = async (e) => {
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
      await messengerApis.messageSend(dataMessage, token, dispatch);
      setNewMessage('');
    }
  };

  // get friend
  React.useEffect(() => {
    const getAllFriend = async () => {
      dispatch(friendActions.FRIEND_REQUEST());
      const res = await getFriend(token);
      if (res.success === true) {
        dispatch(friendActions.FRIEND_SUCCESS(res.data));
      } else {
        dispatch(friendActions.FRIEND_ERROR(res.data));
      }
    };
    getAllFriend();
    dispatch(messengerActions.CLEAR_NEW_USER());
  }, [addNewUser]);

  // set current friend
  React.useEffect(() => {
    if (friends && friends.length > 0 && !currentFriend) {
      setCurrentFriend(friends[0].friendInfo);
    }
  }, [friends]);

  // get all message
  React.useEffect(() => {
    messengerApis.getAllMessage(currentFriend?._id, token, dispatch);
  }, [currentFriend?._id]);

  // cap nhat seen tin nhan khi nguoi nhan xem tin nhan
  React.useEffect(() => {
    if (message.length > 0) {
      if (
        message[message.length - 1].senderId !== user.id &&
        message[message.length - 1].status !== 'seen'
      ) {
        // UPDATE = UPDATE_SEEN_MESSAGE
        // nguoi nhan seen tin nhan khi xem tin nha
        dispatch(
          friendActions.UPDATE_SEEN_MESSAGE({
            id: currentFriend._id,
          })
        );
        // nguoi gui hien thi seen tin nhan ben phia sidebar
        // khi nguoi nhan xem tin nhan
        socketRef.current.emit('seen', {
          senderId: currentFriend._id,
          receiverId: user.id,
        });
        // cap nhat status = seen vao csdl ko tr ve gi het
        messengerApis.seenMessage(
          { _id: message[message.length - 1]._id },
          token
        );
      }
    }
    dispatch(messengerActions.messageGetSuccess_CLEAR());
  }, [messageGetSuccess]);

  // scroll to end page
  React.useEffect(() => {
    scrollRef.current?.scrollIntoView({
      block: 'end',
      inline: 'nearest',
    });
  }, [message]);

  // lang nghe su kien tu socket
  React.useEffect(() => {
    socketRef.current = io('ws://localhost:8000');
    // start: nguoi nhan lang nghe su kien
    socketRef.current.on('currentFriendReceiveTypingMessage', (data) => {
      setTypingMessage(data);
    });

    socketRef.current.on('currentFriendReceiveMessage', (data) => {
      setDisplayMessageToFriend(data);
    });
    // end: nguoi nhan lang nghe su kien

    // start: nguoi gui lang nghe su kien
    // cap nhat status tin nhan
    socketRef.current.on('messageSeenResponse', (messageInfo) => {
      dispatch(
        friendActions.SEEN_MESSAGE({
          ...messageInfo,
        })
      );
      dispatch(messengerActions.UPDAT_STATUS_MESSAGE('seen'));
    });
    // cap nhat status tin nhan
    socketRef.current.on('messageSentResponse', (messageInfo) => {
      dispatch(
        friendActions.SENT_MESSAGE({
          ...messageInfo,
        })
      );
      dispatch(messengerActions.UPDAT_STATUS_MESSAGE('sent'));
    });
    // cap nhat status tin nhan khi nguoi nhan seen tin nhan
    socketRef.current.on('seenSuccess', (data) => {
      dispatch(friendActions.SEEN_ALL(data));
      dispatch(messengerActions.UPDAT_STATUS_MESSAGE('seen'));
    });
    // end: nguoi gui lang nghe su kien
  }, []);

  // add user to socket
  React.useEffect(() => {
    socketRef.current.emit('addUser', user.id, user);
  }, []);

  // get user from socket
  React.useEffect(() => {
    socketRef.current.on('getUser', (socketUsers) => {
      const filterFriends = socketUsers.filter(
        (socketUser) => socketUser.userId !== user.id
      );
      setOnlineFriends(filterFriends);
    });

    socketRef.current.on('addNewUser', (data) => {
      dispatch(messengerActions.ADD_NEW_USER(data));
    });
  }, []);

  // gui tin nhan den nguoi nhan va hien thi tin nhan ben nguoi gui
  React.useEffect(() => {
    if (messageSendSuccess) {
      // gui tin nhan den nguoi nhan
      setTimeout(() => {
        socketRef.current.emit('sendMessage', message[message.length - 1]);
      }, 500);
      // Hien thi tin nhan moi nhat ben phia nguoi gui phan sidebar ben trai
      dispatch(
        friendActions.UPDATE_LAST_MESSAGE({
          ...message[message.length - 1],
        })
      );
      // gan messageSendSuccess = false
      dispatch(messengerActions.MESSAGE_SEND_SUCCESS_CLEAR());
    }
  }, [messageSendSuccess]);

  // hien thi tin nhan khi nguoi nhan dang trong cuoc tro chuyen
  React.useEffect(() => {
    // displayMessageToFriend = socketMessage
    if (displayMessageToFriend && currentFriend) {
      if (
        displayMessageToFriend.senderId === currentFriend._id &&
        displayMessageToFriend.receiverId === user.id
      ) {
        // SOCKET_MESSAGE = DISPLAY_MESSAGE_TO_FRIEND
        // luu vao store nguoi nhan de hien tin nhan ben nguoi nhan
        dispatch(
          messengerActions.DISPLAY_MESSAGE_TO_FRIEND(displayMessageToFriend)
        );

        // cap nhat status = seen vao csdl ko tr ve gi het
        messengerApis.seenMessage(displayMessageToFriend, token);
        // nguoi nhan phat su kien seen
        socketRef.current.emit('messageSeen', displayMessageToFriend);
        // hien thi tin nhan moi nhat va status tin nhan ben phia sidebar nguoi nhan
        dispatch(
          friendActions.UPDATE_LAST_MESSAGE({
            ...displayMessageToFriend,
            status: 'seen',
          })
        );
      }
    }
    setDisplayMessageToFriend('');
  }, [displayMessageToFriend]);

  // hien thi tin nhan khi nguoi nhan chua xem tin nhan
  React.useEffect(() => {
    // displayMessageToFriend = socketMessage
    if (
      displayMessageToFriend &&
      displayMessageToFriend.senderId !== currentFriend._id &&
      displayMessageToFriend.receiverId === user.id
    ) {
      // displayMessageToFriend = socketMessage
      notificationSPlay();
      toast.success(
        `${displayMessageToFriend.senderName} đã gửi một tin nhắn`,
        {
          duration: 5000,
          style: {
            background: '#333',
            color: '#fff',
            fontSize: '18px',
          },
        }
      );
      // cap nhat status = sent vao csdl ko tr ve gi het
      messengerApis.sentMessage(displayMessageToFriend, token);
      // nguoi nhan phat su kien sent
      socketRef.current.emit('sentMessage', displayMessageToFriend);
      // hien thi tin nhan moi nhat va trang thai tin nhan ben phia sidebar nguoi nhan
      dispatch(
        friendActions.UPDATE_LAST_MESSAGE({
          ...displayMessageToFriend,
          status: 'sent',
        })
      );
    }
  }, [displayMessageToFriend]);

  return (
    <>
      <Header />
      <Toaster position={'top-center'} reverseOrder={false} />
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
                        className={`hover-friend ${
                          currentFriend?._id === friend.friendInfo._id
                            ? 'active1'
                            : 'hover1'
                        }`}
                        onClick={() => setCurrentFriend(friend.friendInfo)}
                        key={friend.friendInfo._id}
                      >
                        <FriendMess
                          friend={friend}
                          userId={user.id}
                          onlineFriends={onlineFriends}
                        />
                      </div>
                    ))
                  : 'No friends'}
              </div>
            </div>
          </div>

          {currentFriend && (
            <RightSide
              handleSendingMessageByPressingEnter={
                handleSendingMessageByPressingEnter
              }
              handleSendingMessage={handleSendingMessage}
              handleChangeInput={handleChangeInput}
              setImageMessage={setImageMessage}
              setNewMessage={setNewMessage}
              onlineFriends={onlineFriends}
              typingMessage={typingMessage}
              currentFriend={currentFriend}
              imageMessage={imageMessage}
              newMessage={newMessage}
              scrollRef={scrollRef}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Messenger;
