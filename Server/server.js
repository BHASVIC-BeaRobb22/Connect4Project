const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Client/mainSCREEN.html');
});

io.on('connection', (socket) => {
  console.log(socket.id);
});

server.listen(8080, () => {
  console.log('Server running on port 8080!');
});