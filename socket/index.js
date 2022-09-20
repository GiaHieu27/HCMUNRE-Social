import { Server } from 'socket.io';

const io = new Server(8000, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

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
};

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('addUser', (userId, userInfo) => {
    addUser(userId, socket.id, userInfo);
    io.emit('getUser', users);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    userRemove(socket.id);
    io.emit('getUser', users);
  });
});
