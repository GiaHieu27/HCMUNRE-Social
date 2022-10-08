import React, { useEffect, useRef, useState } from 'react';
import { SocketContext } from '../../../context/socketContext';
import Peer from 'simple-peer';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import messengerSlice from '../../../redux/slices/messengerSlice';

function CallMess() {
  const { socket, user } = React.useContext(SocketContext);
  const {
    receivingCall,
    callAccepted,
    callEnded,
    caller,
    callerSignal,
    stream,
    name,
  } = useSelector((state) => state.messenger.call);

  const [idToCall, setIdToCall] = useState(''); // id nguoi nhan cuoc goi
  const [mySocketId, setMySocketId] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const myVideoRef = useRef();
  const userVideoRef = useRef();
  const connectionRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: '100%', height: '100%' }, audio: true })
      // return MediaStream
      .then((stream) => {
        console.log(stream);
        // setStream(stream);
        dispatch(messengerSlice.actions.SET_STREAM(stream));
        myVideoRef.current.srcObject = stream;
      });

    // socket.on('me', (id) => {
    //   // set socket id
    //   setMySocketId(id);
    // });

    // socket.on('userReceiveCall', (data) => {
    //   const { from, signal, name } = data;
    //   dispatch(
    //     messengerSlice.actions.UPDATE_CALL_RECEVIER({
    //       receivingCall: true,
    //       caller: from,
    //       callerSignal: signal,
    //       name,
    //     })
    //   );
    //   setOpenModal(true);
    // });
  }, []);

  const answerCall = () => {
    // setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: caller });
    });

    peer.on('stream', (stream) => {
      userVideoRef.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    // setCallEnded(true);
    connectionRef.current.destroy();
  };

  return (
    <>
      <h1 style={{ textAlign: 'center', color: '#fff' }}>Zoomish</h1>
      <div className="container">
        <div className="video-container">
          <div className="video">
            {stream && (
              <video
                playsInline
                muted
                ref={myVideoRef}
                autoPlay
                style={{ width: '300px' }}
              />
            )}
          </div>
          <div className="video">
            {callAccepted && !callEnded ? (
              <video
                playsInline
                ref={userVideoRef}
                autoPlay
                style={{ width: '300px' }}
              />
            ) : null}
          </div>
        </div>
        <div className="myId">
          {/* <TextField
            id="filled-basic"
            label="Name"
            variant="filled"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginBottom: '20px' }}
          /> */}
          {/* <CopyToClipboard text={me} style={{ marginBottom: '2rem' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AssignmentIcon fontSize="large" />}
            >
              Copy ID
            </Button>
          </CopyToClipboard> */}

          {/* <TextField
            id="filled-basic"
            label="ID to call"
            variant="filled"
            value={idToCall}
            onChange={(e) => setIdToCall(e.target.value)}
          /> */}
          <div className="call-button">
            {callAccepted && !callEnded && (
              <Button variant="contained" color="secondary" onClick={leaveCall}>
                End Call
              </Button>
            )}
            {idToCall}
          </div>
        </div>
        <div>
          {receivingCall && !callAccepted ? (
            <div className="caller">
              <h1>{name} is calling...</h1>
              <Button variant="contained" color="primary" onClick={answerCall}>
                Answer
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default CallMess;
