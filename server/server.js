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
const io2 = require('socket.io')(server, {
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

const findFriend = (id) => {
  return users.find((user) => user.userId === id);
  // return obj
};

io2.on('connection', (socket) => {
  console.log('connected');
  socket.emit('me', socket.id);

  socket.on('addUser', (userId, userInfo) => {
    addUser(userId, socket.id, userInfo);
  });

  socket.on('callUser', (data) => {
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
// end socket
