const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', (socket) => {
  console.log('USER CONNECTED');
  socket.on('disconnect', () => {
    console.log('USER DISCONNECTED');
  });

  socket.on('chat-message', (messageEvent) => {
    const { id, user, message } = messageEvent;

    socket.broadcast.emit('chat-message', { id, user: 'other', message })

    console.log(`New messagse from ${user}: ${message}`);
  });
})

server.listen('3000', () => {
  console.log('SERVER RUNNING ON PORT 3000.');
});
