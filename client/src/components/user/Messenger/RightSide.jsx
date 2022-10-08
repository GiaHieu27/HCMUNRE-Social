import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Message from './Message';
import MessageSend from './MessageSend';
import FriendInfo from './FriendInfo';
import TooltipMUI from '../TooltipMUI';
import Peer from 'simple-peer';
import { SocketContext } from '../../../context/socketContext';
import { useDispatch, useSelector } from 'react-redux';
import messengerSlice from '../../../redux/slices/messengerSlice';
import CustomDialog from '../CustomDialog';
import { Avatar, Box, Button, Typography } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import CloseIcon from '@mui/icons-material/Close';

function RightSide(props) {
  const { socket, user } = React.useContext(SocketContext);
  const {
    receivingCall,
    callAccepted,
    callEnded,
    caller,
    callerSignal,
    stream,
    sender,
  } = useSelector((state) => state.messenger.call);
  const dispatch = useDispatch();

  const [mySocketId, setMySocketId] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const userVideoRef = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    socket.on('me', (id) => {
      // set socket id
      setMySocketId(id);
    });

    socket.on('userReceiveCall', (data) => {
      const { from, signal, sender } = data;
      console.log(data);
      dispatch(
        messengerSlice.actions.UPDATE_CALL_RECEVIER({
          receivingCall: true,
          caller: from,
          callerSignal: signal,
          sender,
        })
      );
      setOpenModal(true);
    });
  }, []);

  const handleCallUser = (receiverId) => {
    window.open(
      'http://localhost:3000/call',
      '_blank',
      'menubar=yes,toolbar=yes,scrollbars=yes,resizable=yes,top=40,left=200,width=950,height=600'
    );

    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    // console.log(peer);
    // goi dien bang socket ud
    peer.on('signal', (data) => {
      // console.log(data);
      socket.emit('callUser', {
        receiverId: receiverId,
        signalData: data,
        from: mySocketId,
        sender: user,
      });
    });

    peer.on('stream', (stream) => {
      console.log(stream);
      userVideoRef.current.srcObject = stream;
    });

    socket.on('callAccepted', (signal) => {
      console.log(signal);
      dispatch(messengerSlice.actions.SET_CALL_ACCEPTED(true));
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  return (
    <div className="col-9">
      <div className="right-side">
        <input type="checkbox" id="dot" />
        <div className="row-custom">
          <div className="col-8">
            <div className="message-send-show">
              <div className="header">
                <div className="image-name">
                  <div className="image">
                    <img
                      src={props.currentFriend.picture}
                      alt="avatar -friend"
                    />
                    {props.onlineFriends &&
                    props.onlineFriends.length > 0 &&
                    props.onlineFriends.some(
                      (user) => user.userId === props.currentFriend._id
                    ) ? (
                      <div className="active-icon"></div>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="name">
                    <h3>
                      {props.currentFriend.first_name}{' '}
                      {props.currentFriend.last_name}
                    </h3>
                  </div>
                </div>
                <div className="icons">
                  <div
                    className="icon"
                    onClick={() => handleCallUser(props.currentFriend._id)}
                  >
                    <TooltipMUI title="Gọi điện">
                      <VideocamIcon color="success" />
                    </TooltipMUI>
                  </div>
                  <div className="icon">
                    <label htmlFor="dot">
                      <TooltipMUI title="Thông tin về cuộc trò chuyện">
                        <MoreHorizIcon color="success" />
                      </TooltipMUI>
                    </label>
                  </div>
                </div>
              </div>

              <Message
                currentFriend={props.currentFriend}
                scrollRef={props.scrollRef}
                typingMessage={props.typingMessage}
              />
              <MessageSend
                handleChangeInput={props.handleChangeInput}
                handleSendingMessage={props.handleSendingMessage}
                handleSendingMessageByPressingEnter={
                  props.handleSendingMessageByPressingEnter
                }
                newMessage={props.newMessage}
                setNewMessage={props.setNewMessage}
                imageMessage={props.imageMessage}
                setImageMessage={props.setImageMessage}
              />
            </div>
          </div>
          <div className="col-4">
            <FriendInfo
              // message={message}
              currentFriend={props.currentFriend}
              onlineFriends={props.onlineFriends}
            />
          </div>
        </div>
      </div>

      <CustomDialog
        open={openModal}
        handleClose={() => setOpenModal(false)}
        content={
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: ' center',
            }}
          >
            <Avatar
              alt="avatar-sender"
              src={sender?.picture}
              sx={{ width: '75px', height: '75px', mb: '18px' }}
            />
            <Typography
              variant="h6"
              fontWeight={700}
              textAlign="center"
              lineHeight={1}
              fontFamily="inherit"
              fontSize={27.2}
            >
              {sender.first_name} {sender.last_name}
            </Typography>
            <Typography
              variant="h6"
              fontWeight={700}
              textAlign="center"
              fontFamily="inherit"
              fontSize={27.2}
            >
              đang gọi cho bạn
            </Typography>
            <Typography
              variant="body1"
              fontWeight={500}
              textAlign="center"
              fontSize={14.5}
            >
              Cuộc gọi sẽ bắt đầu ngay sau khi bạn chấp nhận
            </Typography>
          </Box>
        }
        actions={
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: ' center',
              marginTop: '20px',
            }}
            width="100%"
          >
            <TooltipMUI title="Từ chối cuộc gọi" placement="top">
              <Button
                variant="contained"
                size="large"
                color="error"
                sx={{
                  borderRadius: '50%',
                  width: '50px',
                  height: '63px',
                }}
              >
                <CloseIcon sx={{ fontSize: '1.7rem' }} />
              </Button>
            </TooltipMUI>
            <TooltipMUI title="Chấp nhận cuộc gọi" placement="top">
              <Button
                variant="contained"
                size="large"
                color="successCustom"
                sx={{
                  borderRadius: '50%',
                  width: '50px',
                  height: '63px',
                  marginLeft: '43px',
                }}
              >
                <VideocamIcon sx={{ fontSize: '1.7rem' }} />
              </Button>
            </TooltipMUI>
          </Box>
        }
      />
    </div>
  );
}

RightSide.prototype = {
  onlineFriends: PropTypes.array,
  currentFriend: PropTypes.object,

  handleChangeInput: PropTypes.func,
  handleSendingMessage: PropTypes.func,
  setNewMessage: PropTypes.func,
  handleSendingMessageByPressingEnter: PropTypes.func,
  setImageMessage: PropTypes.func,

  newMessage: PropTypes.string,
  imageMessage: PropTypes.string,
  typingMessage: PropTypes.string,

  scrollRef: PropTypes.node,
};

export default RightSide;
