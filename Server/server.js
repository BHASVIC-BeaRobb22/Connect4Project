const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path");
const backwards = path.join(__dirname, '../'); // points to "/Connect 4 Project"


app.use(express.static(path.join(backwards, "/Client/"))); // allows CSS to be displayed when serving mainSCREEN.html

app.get('/', (req, res) => {
  res.sendFile(backwards + '/Client/mainSCREEN.html'); // serves mainSCREEN.html
});

io.on('connection', (socket) => { 
  console.log(socket.id); // Displays socket ID of connected client

socket.on("roomJoinToServer", roomCode => {
  if (roomCode.length == 0) {
    socket.emit("roomJoin0Length", "A room code must be entered to join a room");
  }
  else if(roomCode.length != 6 && roomCode.length > 0) {
    socket.emit("roomJoinInvalid", "The room code you have entered is invalid. (Codes must be 6 characters long)");
  }
  else {
    // check if roomCode is present in array (stage 3)
  }

});

});



server.listen(8080, () => {
  console.log('Server running on port 8080!');
});


