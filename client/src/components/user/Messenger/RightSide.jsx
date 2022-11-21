import React from 'react';
import PropTypes from 'prop-types';

import { Avatar, Box, Button, Typography } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import VideocamIcon from '@mui/icons-material/Videocam';
import CloseIcon from '@mui/icons-material/Close';
import CallEndIcon from '@mui/icons-material/CallEnd';

import Message from './Message';
import MessageSend from './MessageSend';
import FriendInfo from './FriendInfo';
import TooltipMUI from '../../TooltipMUI';
import CustomDialog from '../../CustomDialog';
import { SocketContext } from '../../../context/socketContext';

function RightSide(props) {
  const { socket, user } = React.useContext(SocketContext);

  const [openModalReceive, setOpenModalReceive] = React.useState(false);
  const [openModalCall, setOpenModalCall] = React.useState(false);
  const [openModalReject, setOpenModalReject] = React.useState(false);
  const [sender, setSender] = React.useState({});

  const handleCall = (receiverId) => {
    setOpenModalCall(true);
    socket.emit('callFriend', user, receiverId);
  };

  const handleReceiveCall = (senderId) => {
    setOpenModalReceive(false);
    socket.emit('receiveCallSuccess', senderId);
    window.open(
      `http://localhost:3000/call/receiver`,
      '_blank',
      'menubar=yes,toolbar=yes,resizable=yes,top=40,left=200,width=950,height=600'
    );
  };

  const handleRejectCall = (senderId) => {
    setOpenModalReceive(false);
    socket.emit('rejectCall', senderId);
  };

  const handleCancelCall = (receiverId) => {
    setOpenModalCall(false);
    socket.emit('cancelCall', receiverId);
  };
  // listen event from socket
  React.useEffect(() => {
    socket.on('friendReceiveCall', (user, soketIdFriend) => {
      setOpenModalReceive(true);
      setSender(user);
    });

    socket.on('receiveCallSuccess', (socketIdCaller) => {
      setOpenModalCall(false);
      window.open(
        `http://localhost:3000/call/${props.currentFriend._id}`,
        '_blank',
        'menubar=yes,toolbar=yes,resizable=yes,top=40,left=200,width=950,height=600'
      );
    });

    socket.on('rejectCall', () => {
      setOpenModalReject(true);
      setTimeout(() => {
        setOpenModalCall(false);
      }, 2000);
      setTimeout(() => {
        setOpenModalReject(false);
      }, 3000);
    });

    socket.on('cancelCall', () => {
      setOpenModalReceive(false);
    });
  }, []);

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
                    onClick={() => handleCall(props.currentFriend._id)}
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

      {/* modal receiver */}
      <CustomDialog
        open={openModalReceive}
        handleClose={() => setOpenModalReceive(false)}
        maxWidth="315px"
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
                size="small"
                color="error"
                sx={{
                  borderRadius: '50%',
                  minWidth: '50px',
                  height: '50px',
                }}
                onClick={() => handleRejectCall(sender.id)}
              >
                <CloseIcon sx={{ fontSize: '1.7rem' }} />
              </Button>
            </TooltipMUI>

            <TooltipMUI title="Chấp nhận cuộc gọi" placement="top">
              <Button
                variant="contained"
                size="small"
                color="successCustom"
                sx={{
                  borderRadius: '50%',
                  minWidth: '50px',
                  height: '50px',
                  marginLeft: '43px',
                }}
                onClick={() => handleReceiveCall(sender.id)}
              >
                <VideocamIcon sx={{ fontSize: '1.7rem' }} />
              </Button>
            </TooltipMUI>
          </Box>
        }
      />
      {/* modal caller */}
      <CustomDialog
        open={openModalCall}
        handleClose={() => setOpenModalCall(false)}
        maxWidth="315px"
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
              src={props.currentFriend.picture}
              sx={{ width: '75px', height: '75px', mb: '18px' }}
            />
            {!openModalReject ? (
              <>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  textAlign="center"
                  lineHeight={1}
                  fontFamily="inherit"
                  fontSize={25.2}
                >
                  {props.currentFriend.first_name}{' '}
                  {props.currentFriend.last_name}
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight={500}
                  textAlign="center"
                  fontSize={15.5}
                  sx={{ mt: '10px' }}
                >
                  đang gọi ...
                </Typography>
              </>
            ) : (
              <>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  textAlign="center"
                  lineHeight={1}
                  fontFamily="inherit"
                  fontSize={25.2}
                >
                  {props.currentFriend.first_name}{' '}
                  {props.currentFriend.last_name}
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight={500}
                  textAlign="center"
                  fontSize={15.5}
                  sx={{ mt: '10px' }}
                >
                  đã từ chối cuộc gọi
                </Typography>
              </>
            )}
          </Box>
        }
        actions={
          !openModalReject ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: ' center',
                marginTop: '20px',
              }}
              width="100%"
            >
              <TooltipMUI title="Huỷ cuộc gọi" placement="top">
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  sx={{
                    borderRadius: '50%',
                    minWidth: '50px',
                    height: '50px',
                  }}
                  onClick={() => handleCancelCall(props.currentFriend._id)}
                >
                  <CallEndIcon sx={{ fontSize: '1.7rem' }} />
                </Button>
              </TooltipMUI>
            </Box>
          ) : (
            ''
          )
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
