import { Server } from 'socket.io';

const io = new Server(8000, {
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

const userRemove = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const findFriend = (id) => {
  return users.find((user) => user.userId === id);
  // return obj
};

io.on('connection', (socket) => {
  console.log('user connected');

  // start messenger
  socket.on('addUser', (userId, userInfo) => {
    // userId: string
    // socket.id: string
    // userInfo: obj = user trong store
    addUser(userId, socket.id, userInfo);
    io.emit('getUser', users);

    const newUsers = users.filter((user) => user.userId !== userId);
    const con = 'add_new_user';
    for (let i = 0; i < newUsers.length; i++) {
      socket.to(newUsers[i].socketId).emit('addNewUser', con);
    }
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
  // end messenger

  // start notification
  socket.on('sendNotification', (data) => {
    // data: obj
    const friend = findFriend(data.recieverId);
    if (friend !== undefined) {
      socket.to(friend.socketId).emit('getNotification', data);
    }
  });
  // start notification

  // callingggggggg
  socket.emit('me', socket.id);

  socket.on('callUser', (data) => {
    const friend = findFriend(data.receiverId);
    // friend = obj | undefined
    if (friend !== undefined) {
      io.to(friend.socketId).emit('userReceiveCall', {
        signal: data.signalData,
        from: data.from,
        sender: data.sender,
      });
    }
  });

  socket.on('answerCall', (data) => {
    io.to(data.to).emit('callAccepted', data.signal);
  });
  // callingggggggg

  socket.on('disconnect', () => {
    socket.broadcast.emit('callEnded');
    userRemove(socket.id);
    io.emit('getUser', users);
  });
});
