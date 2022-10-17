import React from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

import { Box, Button } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import CallEndIcon from '@mui/icons-material/CallEnd';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
// import PersonIcon from '@mui/icons-material/Person';

import TooltipMUI from '../TooltipMUI';
import { SocketContext } from '../../../context/socketContext';

const socket = io('ws://localhost:8000');

function CallMess() {
  const { receiverId } = useParams();
  const { user } = React.useContext(SocketContext);

  const [callAccepted, setCallAccepted] = React.useState(false);
  const [callEnded, setCallEnded] = React.useState(false);
  const [receivingCall, setReceivingCall] = React.useState(false);
  const [toggleCam, setToggleCam] = React.useState(true);
  const [toggleMic, setToggleMic] = React.useState(true);

  const [myStream, setMyStream] = React.useState();
  const [callerSignal, setCallerSignal] = React.useState();
  // const [currentFriend, serCurrentFriend] = React.useState({});

  const [caller, setCaller] = React.useState('');
  const [mySocketId, setMySocketId] = React.useState('');

  const myVideoRef = React.useRef();
  const userVideoRef = React.useRef();
  const connectionRef = React.useRef();
  const btnCallRef = React.useRef();
  const btnAnswerCallRef = React.useRef();

  // set up call
  React.useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      // return MediaStream
      .then((stream) => {
        setMyStream(stream);
        myVideoRef.current.srcObject = stream;
      });

    socket.emit('addUser', user.id, user, receiverId);
  }, []);

  // get my socket id from socket
  React.useEffect(() => {
    socket.on('me', (id) => {
      setMySocketId(id);
    });

    // socket.on('infoFriend', (friend) => {
    //   serCurrentFriend(friend);
    // });

    socket.on('userReceiveCall', (data) => {
      const { from, signal } = data;
      setReceivingCall(true);
      setCaller(from);
      setCallerSignal(signal);
      btnAnswerCallRef.current.click();
    });

    socket.on('callEnded', () => {
      console.log('run');
      setReceivingCall(false);
      setCaller('');
      setCallAccepted(false);
      setCallEnded(true);
      connectionRef.current.destroy();
    });
  }, []);
  // auto call
  React.useEffect(() => {
    const a = setTimeout(() => {
      if (receiverId !== 'receiver') {
        btnCallRef.current.click();
      }
    }, 3000);
    return () => {
      clearTimeout(a);
    };
  }, []);

  const handleCallUser = (receiverId) => {
    const peer1 = new Peer({
      initiator: true,
      trickle: false,
      stream: myStream,
    });

    // goi dien bang socket id
    peer1.on('signal', (data) => {
      // signal offer
      socket.emit('callUser', {
        receiverId: receiverId,
        signalData: data,
        from: mySocketId,
      });
    });

    peer1.on('stream', (stream) => {
      // stream = MediaStream
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
      // signal answer
      socket.emit('answerCall', { signal: data, to: caller });
    });

    peer2.on('stream', (stream) => {
      // stream = MediaStream
      userVideoRef.current.srcObject = stream;
    });

    peer2.signal(callerSignal);
    connectionRef.current = peer2;
  };

  const handleLeaveCall = () => {
    setCallEnded(true);
    setReceivingCall(false);
    setCaller('');
    setCallAccepted(false);
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  const handleToggleCam = () => {
    const videoTrack = myStream
      .getTracks()
      .find((track) => track.kind === 'video');
    if (videoTrack.enabled) {
      videoTrack.enabled = false;
      setToggleCam(false);
    } else {
      videoTrack.enabled = true;
      setToggleCam(true);
    }
  };

  const handleToggleMic = () => {
    const audioTrack = myStream
      .getTracks()
      .find((track) => track.kind === 'audio');
    if (audioTrack.enabled) {
      audioTrack.enabled = false;
      setToggleMic(false);
    } else {
      audioTrack.enabled = true;
      setToggleMic(true);
    }
  };

  return (
    <>
      <div className="container-fluid p-0" style={{ height: '98.99vh' }}>
        <div className="video-container">
          <div className="video">
            {myStream && <video playsInline ref={myVideoRef} autoPlay />}
          </div>
          <div className="video">
            {callAccepted && !callEnded && (
              <video playsInline ref={userVideoRef} autoPlay />
            )}
          </div>

          <div className="interaction">
            <div className="call_button">
              {callAccepted && !callEnded ? (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: ' center',
                    width: '100%',
                  }}
                >
                  <TooltipMUI
                    title={toggleCam ? 'Tắt camera' : 'Bật camera'}
                    placement="top"
                  >
                    <Button
                      variant="contained"
                      size="small"
                      color={toggleCam ? 'successCustom' : 'error'}
                      onClick={handleToggleCam}
                      sx={{
                        borderRadius: '50%',
                        minWidth: '50px',
                        height: '50px',
                      }}
                    >
                      {toggleCam ? (
                        <VideocamIcon sx={{ fontSize: '1.7rem' }} />
                      ) : (
                        <VideocamOffIcon sx={{ fontSize: '1.7rem' }} />
                      )}
                    </Button>
                  </TooltipMUI>

                  <TooltipMUI title="Kết thúc cuộc gọi" placement="top">
                    <Button
                      variant="contained"
                      size="small"
                      color="error"
                      onClick={handleLeaveCall}
                      sx={{
                        borderRadius: '50%',
                        minWidth: '50px',
                        height: '50px',
                        marginLeft: '30px',
                      }}
                    >
                      <CallEndIcon sx={{ fontSize: '1.7rem' }} />
                    </Button>
                  </TooltipMUI>

                  <TooltipMUI
                    title={toggleMic ? 'Tắt mic' : 'Bật mic'}
                    placement="top"
                  >
                    <Button
                      variant="contained"
                      size="small"
                      color={toggleMic ? 'successCustom' : 'error'}
                      onClick={handleToggleMic}
                      sx={{
                        borderRadius: '50%',
                        minWidth: '50px',
                        height: '50px',
                        marginLeft: '30px',
                      }}
                    >
                      {toggleMic ? (
                        <MicIcon sx={{ fontSize: '1.7rem' }} />
                      ) : (
                        <MicOffIcon sx={{ fontSize: '1.7rem' }} />
                      )}
                    </Button>
                  </TooltipMUI>
                </Box>
              ) : (
                <Button
                  onClick={() => handleCallUser(receiverId)}
                  ref={btnCallRef}
                  hidden
                ></Button>
              )}
            </div>
          </div>

          {receivingCall && !callAccepted && (
            <Button
              onClick={() => handleAnswerCall()}
              ref={btnAnswerCallRef}
              hidden
            ></Button>
          )}
        </div>
      </div>
    </>
  );
}

export default CallMess;
