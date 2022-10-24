import { Server } from 'socket.io';

const io2 = new Server(8000, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// array chứa tất cả user khi đăng nhập vào hệ thống
let users = [];
const addUser = (userId, socketId, userInfo) => {
  const checkUser = users.some((user) => user.userId === userId);
  if (!checkUser) {
    users.push({ userId, socketId, userInfo });
  }
};

const findFriend = (id) => {
  return users.find((user) => user.userId === id);
  // return obj
};

io2.on('connection', (socket) => {
  console.log('connected');
  socket.emit('getSocketId', socket.id);

  socket.on('addUser', (userId, userInfo) => {
    addUser(userId, socket.id, userInfo);

    // const friend = findFriend(receiverId);
    // if (friend !== undefined) {
    //   socket.emit('infoFriend', friend);
    // }
  });

  socket.on('callUser', (data) => {
    // data = obj
    const friend = findFriend(data.receiverId);
    // friend = obj
    if (friend !== undefined) {
      socket.to(friend.socketId).emit('userReceiveCall', {
        signal: data.signalData,
        from: data.from,
      });
    }
  });

  socket.on('answerCall', (data) => {
    // data = obj;
    socket.to(data.to).emit('callAccepted', data.signal);
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('callEnded');
  });
});
