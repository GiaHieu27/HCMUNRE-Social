import React from 'react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import messengerSlice from '../../../redux/slices/messengerSlice';
import { SocketContext } from '../../../context/socketContext';
import Peer from 'simple-peer';

function CallMess() {
  const { socket, user } = React.useContext(SocketContext);

  // const [idToCall, setIdToCall] = React.useState(''); // id nguoi nhan cuoc goi
  const [callAccepted, setCallAccepted] = React.useState(false);
  const [myStream, setMyStream] = React.useState();
  const [callEnded, setCallEnded] = React.useState(false);
  const [mySocketId, setMySocketId] = React.useState('');
  const [callerSignal, setCallerSignal] = React.useState();
  const [caller, setCaller] = React.useState();
  // const [sender, setSender] = React.useState({});
  const [receivingCall, setReceivingCall] = React.useState(false);

  const myVideoRef = React.useRef();
  const userVideoRef = React.useRef();
  const connectionRef = React.useRef();

  const dispatch = useDispatch();

  React.useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: '100%', height: '100%' }, audio: true })
      // return MediaStream
      .then((stream) => {
        setMyStream(stream);
        myVideoRef.current.srcObject = stream;
      });
  }, []);

  React.useEffect(() => {
    socket.emit('addUser', user.id, user);
  }, []);

  // get my socket id from socket
  React.useEffect(() => {
    socket.on('getUser', (socketUsers) => {
      const filterFriends = socketUsers.filter(
        (socketUser) => socketUser.userId === user.id
      );
      setMySocketId(filterFriends[0].socketId);
    });
  }, []);

  React.useEffect(() => {
    socket.on('userReceiveCall', (data) => {
      const { from, signal, sender } = data;
      // dispatch(
      //   messengerSlice.actions.UPDATE_CALL_RECEVIER({
      //     receivingCall: true,
      //     caller: from, // socket id nguoi goi
      //     callerSignal: signal,
      //     sender,
      //   })
      // );
      setReceivingCall(true);
      setCaller(from);
      setCallerSignal(signal);
      // setSender(sender);
      // setOpenModal(true);
    });
  }, []);

  const handleCallUser = (receiverId) => {
    const peer1 = new Peer({
      initiator: true,
      trickle: false,
      stream: myStream,
    });

    // goi dien bang socket id
    peer1.on('signal', (data) => {
      socket.emit('callUser', {
        receiverId: receiverId,
        signalData: data,
        from: mySocketId,
        sender: user,
      });
    });

    peer1.on('stream', (stream) => {
      console.log(stream);

      userVideoRef.current.srcObject = stream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer1.signal(signal);
    });

    connectionRef.current = peer1;
    console.log(myStream);
  };

  const handleAnswerCall = () => {
    setCallAccepted(true);

    const peer2 = new Peer({
      initiator: false,
      trickle: false,
      stream: myStream,
    });

    peer2.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: caller });
    });

    peer2.on('stream', (stream) => {
      console.log(stream);

      userVideoRef.current.srcObject = stream;
    });

    peer2.signal(callerSignal);
    connectionRef.current = peer2;

    console.log(myStream);
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  return (
    <>
      <div className="container">
        <div className="video-container">
          <div className="video">
            {myStream && (
              <video
                playsInline
                ref={myVideoRef}
                autoPlay
                style={{ width: '300px' }}
              />
            )}
          </div>
          <div className="video">
            <video
              playsInline
              ref={userVideoRef}
              autoPlay
              style={{ width: '300px' }}
            />
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
          </div>
        </div>
        <div>
          {/* {receivingCall && !callAccepted ? (
            <div className="caller">
              <h1>{name} is calling...</h1>
              <Button variant="contained" color="primary" onClick={answerCall}>
                Answer
              </Button>
            </div>
          ) : null} */}
        </div>
      </div>
    </>
  );
}

export default CallMess;
