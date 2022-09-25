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

const findFriend = (id) => {
  return users.find((user) => user.userId === id);
  // return obj
};

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('addUser', (userId, userInfo) => {
    // userId: string
    // socket.id: string
    // userInfo: obj
    addUser(userId, socket.id, userInfo);
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

  socket.on('messageSeen', (messageInfo) => {
    // messageInfo = obj
    // sample messageInfo = {
    //   senderId: '62fa3d9592476cd670686132',
    //   senderName: 'LuongHieu',
    //   receiverId: 62fde7d30e956c3d7b2fefa8',
    //   message: { text: 'ha', image:'' },
    //   status: 'unseen',
    //   _id: '632d796b580d049c524e022b',120Z',
    //   createdAt: '2022-09-23T09:16:27.120Z',
    //   updatedAt: '2022-09-23T09:16:27. server120Z',
    // }
    const user = findFriend(messageInfo.senderId);
    if (user !== undefined) {
      socket.to(user.socketId).emit('messageSeenResponse', messageInfo);
    }
  });

  socket.on('sentMessage', (messageInfo) => {
    const user = findFriend(messageInfo.senderId);
    if (user !== undefined) {
      socket.to(user.socketId).emit('messageSentResponse', messageInfo);
    }
  });

  socket.on('seen', (data) => {
    const user = findFriend(data.senderId);
    if (user !== undefined) {
      socket.to(user.socketId).emit('seenSuccess', data);
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    userRemove(socket.id);
    io.emit('getUser', users);
  });
});
