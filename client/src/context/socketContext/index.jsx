import React from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

const SocketContext = React.createContext();

function SocketProvider({ children }) {
  const user = useSelector((state) => state.user);
  const socket = io('ws://localhost:8000');

  return (
    <SocketContext.Provider
      value={{
        user,
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export { SocketContext, SocketProvider };
