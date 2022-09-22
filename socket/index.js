import { Server } from 'socket.io';

const io = new Server(8000, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

let users = [];
// array chứa tất cả user khi đăng nhập vào hệ thống

const addUser = (userId, socketId, userInfo) => {
  const checkUser = users.some((user) => user.userId === userId);
  if (!checkUser) {
    users.push({ userId, socketId, userInfo });
  }
};

const userRemove = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const findFriend = (receiverId) => {
  return users.find((user) => user.userId === receiverId);
  // return obj
};

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('addUser', (userId, userInfo) => {
    // userId: string
    // socket.id: string
    // userInfo: obj
    addUser(userId, socket.id, userInfo);
    console.log(users.length);
    io.emit('getUser', users);
  });

  socket.on('typingMessage', (data) => {
    // data = obj
    const friend = findFriend(data.receiverId);
    // friend = obj | undefined
    if (friend !== undefined) {
      socket
        .to(friend.socketId)
        .emit('currentFriendReceiveTypingMessage', data);
    }
  });

  socket.on('sendMessage', (data) => {
    // data: obj
    const friend = findFriend(data.receiverId);
    // friend = obj | undefined
    if (friend !== undefined) {
      socket.to(friend.socketId).emit('currentFriendReceiveMessage', data);
    }
  });

  socket.on('messageSeen', (msg) => {
    // msg = obj
    const user = findFriend(msg.senderId);
    if (user !== undefined) {
      socket.to(user.socketId).emit('msgSeenResponse', msg);
    }
  });

  socket.on('sentMessage', (msg) => {
    const user = findFriend(msg.senderId);
    if (user !== undefined) {
      socket.to(user.socketId).emit('msgSentResponse', msg);
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    userRemove(socket.id);
    io.emit('getUser', users);
  });
});
