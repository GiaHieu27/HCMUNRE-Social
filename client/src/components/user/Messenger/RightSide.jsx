import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PhoneIcon from '@mui/icons-material/Phone';
import Message from './Message';
import MessageSend from './MessageSend';
import FriendInfo from './FriendInfo';
import TooltipMUI from '../TooltipMUI';
import Peer from 'simple-peer';
import { SocketContext } from '../../../context/socketContext';
import { useDispatch, useSelector } from 'react-redux';
import messengerSlice from '../../../redux/slices/messengerSlice';
import CustomDialog from '../CustomDialog';
import { Box, Button } from '@mui/material';

function RightSide(props) {
  const { socket, user } = React.useContext(SocketContext);
  const {
    receivingCall,
    callAccepted,
    callEnded,
    caller,
    callerSignal,
    stream,
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
      const { from, signal, name } = data;
      console.log(data);
      dispatch(
        messengerSlice.actions.UPDATE_CALL_RECEVIER({
          receivingCall: true,
          caller: from,
          callerSignal: signal,
          name,
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
        name: user.username,
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
                    <TooltipMUI title="Bắt đầu gọi điện">
                      <PhoneIcon color="success" />
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
        title={'Cuộc gọi đến'}
        content={<Box sx={{ p: '10px' }}></Box>}
        actions={
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
            width="100%"
          >
            <Button
              sx={{ mr: '8px' }}
              variant="text"
              // onClick={() => {
              //   setSelectedVaccine(null);
              //   setShowAddDialog(false);
              // }}
              // disabled={addLoading}
            >
              Cancel
            </Button>
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
