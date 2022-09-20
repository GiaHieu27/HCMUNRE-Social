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
    // userId: string
    // userInfo: obj
    // socket.id: string
    addUser(userId, socket.id, userInfo);
    io.emit('getUser', friendsOfUser);
  });

  socket.on('sendMessage', (data) => {
    // data: obj
    const friend = findFriend(data.receiverId);

    if (friend !== undefined) {
      socket.to(friend.socketId).emit('currentFriendReceiveMessage', data);
    }
  });

  socket.on('typingMessage', (data) => {
    // data: obj
    const friend = findFriend(data.receiverId);
    console.log(data);

    if (friend !== undefined) {
      socket.to(friend.socketId).emit('currentFriendReceiveTypingMessage', {
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
