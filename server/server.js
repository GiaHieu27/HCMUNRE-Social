const express = require('express');
const cors = require('cors');
const http = require('http');
const fileupload = require('express-fileupload');
const dotenv = require('dotenv');
dotenv.config();
const { readdirSync } = require('fs');

const connectDb = require('./config');
connectDb(process.env.DATABASE_URL);

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
app.use(cors());
app.use(express.json());
app.use(
  fileupload({
    useTempFiles: true,
  })
);

// route
readdirSync('./routes').map((route) =>
  app.use('/', require('./routes/' + route))
);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
// start socket
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

// const findFriendConnect = (socketId) => {
//   return users.filter((user) => user.socketId === socketId);
//   // return obj
// };

// const findFriendDisconnect = (socketId) => {
//   return users.filter((user) => user.socketId === socketId);
//   // return obj
// };

io.on('connection', (socket) => {
  console.log('connected');
  // start messenger
  socket.on('addUser', (userId, userInfo) => {
    // userId: string
    // socket.id: string
    // userInfo: obj = user trong store
    addUser(userId, socket.id, userInfo);
    io.emit('getUser', users);

    // const user = findFriendConnect(socket.id);
    // if (user !== undefined) {
    //   console.log('Connected:', user[0]?.userInfo.username);
    // }

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
  // end notification

  // start callingggggggg
  socket.on('callFriend', (user, receiverId) => {
    const friend = findFriend(receiverId);
    // friend = obj
    if (friend !== undefined) {
      io.to(friend.socketId).emit('friendReceiveCall', user, friend.socketId);
    }
  });

  socket.on('receiveCallSuccess', (senderId) => {
    const user = findFriend(senderId);
    // friend = obj
    if (user !== undefined) {
      io.to(user.socketId).emit('receiveCallSuccess', user.socketId);
    }
  });

  socket.on('rejectCall', (senderId) => {
    const user = findFriend(senderId);
    // friend = obj
    if (user !== undefined) {
      io.to(user.socketId).emit('rejectCall');
    }
  });

  socket.on('cancelCall', (receiverId) => {
    const friend = findFriend(receiverId);
    // friend = obj
    if (friend !== undefined) {
      io.to(friend.socketId).emit('cancelCall');
    }
  });

  // end callingggggggg

  socket.on('disconnect', () => {
    // const user = findFriendDisconnect(socket.id);
    // if (user !== undefined) {
    //   console.log('disconnected:', user[0]?.userInfo.username);
    // }

    socket.broadcast.emit('callEnded');
    userRemove(socket.id);
    // io.emit('getUser', users);
  });
});
// end socket
