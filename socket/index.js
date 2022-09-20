import { Server } from 'socket.io';

const io = new Server(8000, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

let friendsOfUser = [];

const addUser = (userId, socketId, userInfo) => {
  const checkUser = friendsOfUser.some((user) => user.userId === userId);
  if (!checkUser) {
    friendsOfUser.push({ userId, socketId, userInfo });
  }
};

const userRemove = (socketId) => {
  friendsOfUser = friendsOfUser.filter((user) => user.socketId !== socketId);
};

const findFriend = (receiverId) => {
  return friendsOfUser.find((user) => user.userId === receiverId);
};

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('addUser', (userId, userInfo) => {
    addUser(userId, socket.id, userInfo);
    io.emit('getUser', friendsOfUser);
  });

  socket.on('sendMessage', (data) => {
    const friend = findFriend(data.receiverId);

    if (friend !== undefined) {
      socket.to(friend.socketId).emit('getMessage', data);
    }
  });

  socket.on('typingMessage', (data) => {
    const user = findFriend(data.receiverId);
    console.log(data);

    if (user !== undefined) {
      socket.to(user.socketId).emit('typingMessageGet', {
        senderId: data.senderId,
        receiverId: data.receiverId,
        msg: data.msg,
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    userRemove(socket.id);
    io.emit('getUser', friendsOfUser);
  });
});
