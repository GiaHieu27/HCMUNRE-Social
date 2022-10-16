import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { Button } from '@mui/material';
import Peer from 'simple-peer';
import VideocamIcon from '@mui/icons-material/Videocam';

const socket = io.connect('http://localhost:5000');

function CallMess() {
  const { user } = useSelector((state) => state.user);
  const { receiverId } = useParams();

  const [callAccepted, setCallAccepted] = React.useState(false);
  const [callEnded, setCallEnded] = React.useState(false);
  const [receivingCall, setReceivingCall] = React.useState(false);

  const [myStream, setMyStream] = React.useState();
  const [callerSignal, setCallerSignal] = React.useState();
  const [caller, setCaller] = React.useState();

  const [mySocketId, setMySocketId] = React.useState('');

  const myVideoRef = React.useRef();
  const userVideoRef = React.useRef();
  const connectionRef = React.useRef();

  React.useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
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
    socket.on('me', (id) => {
      setMySocketId(id);
    });
    socket.on('userReceiveCall', (data) => {
      const { from, signal } = data;
      setReceivingCall(true);
      setCaller(from);
      setCallerSignal(signal);
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
          <div className="call-button">
            {callAccepted && !callEnded ? (
              <Button variant="contained" color="secondary" onClick={leaveCall}>
                End Call
              </Button>
            ) : (
              <Button
                color="primary"
                aria-label="call"
                onClick={() => handleCallUser(receiverId)}
              >
                <VideocamIcon fontSize="large" />
              </Button>
            )}
          </div>
        </div>
        <div>
          {receivingCall && !callAccepted ? (
            <div className="caller">
              <h1> is calling...</h1>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAnswerCall()}
              >
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
