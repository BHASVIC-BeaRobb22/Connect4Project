const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path");
const backwards = path.join(__dirname, '../'); // points to "/Connect 4 Project"

var rooms = [];


function checkIfCodeInRooms(roomCode) {

  let found = 0, index = 0;

  while (found == 0 && index < rooms.length) {
    if (rooms[index] === roomCode) {
      found = 1;
    }
    else {
      index++;
    }
  }
  return {"found": found, "index": index};

}

function deleteCode(roomCode) {

  console.log(rooms);

  let check = checkIfCodeInRooms(roomCode)

  if (check.found == 1) {
    rooms.splice(check.index, 1);
  }

  console.log(rooms);

}




app.use(express.static(path.join(backwards, "/Client/"))); // allows CSS to be displayed when serving mainSCREEN.html

app.get('/', (req, res) => {
  res.sendFile(backwards + '/Client/mainSCREEN.html'); // serves mainSCREEN.html on connection 
});

io.on('connection', (socket) => { 
  console.log(socket.id); // Displays socket ID of connected client


// VALIDATING ROOM CODE FOR JOINING

socket.on("roomJoinToServer", roomCode => { 
  if (roomCode.length == 0) {
    socket.emit("roomJoin0Length", "A room code must be entered to join a room");
  }
  else if (roomCode.length != 6 && roomCode.length > 0) {
    socket.emit("roomJoinInvalid", "The room code you have entered is invalid. (Codes must be 6 characters long)");
  }
  else {

    if (checkIfCodeInRooms(roomCode).found === 1) {
      socket.emit("roomJoinValid", roomCode);
    }
    else {
      socket.emit("roomNotFound", "The room does not exist, try another code");
    }
  }

});

socket.on("generateRoomCode", id => { // GENERATING A ROOM CODE
 
  const count = 6;
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"; // allows the code to be alphanumeric
  const charlength = chars.length;
  let codeArray = [];
  let index = 0;

  for (index = 0; index < count; index++) {
    let randomNum = Math.floor(Math.random() * (charlength - 1)); // returns a random integer in the range 0-61 and sets it to randomNum. Need (charlength - 1) as element 62 is not in array
    codeArray[index] = chars[randomNum]; // Chooses a random char using the random integer generated, and adds it to codeArray[]
  }
  const generatedCode = codeArray.join("");
  rooms.push(generatedCode);
  socket.emit("generateCodeComplete", generatedCode);
});



// CONNECTING USERS TO ROOM


socket.on("connectPlayerToRoom", roomCode => {
  socket.join(roomCode);
});


// CHECKING ROOM CODE IN LOBBY


socket.on("roomCheck", roomCode => {
  if (checkIfCodeInRooms(roomCode).found === 1) {
    socket.emit("codePassed");
  }
  else {
    socket.emit("codeFailed");
  }
});


});


server.listen(8080, () => {
  console.log('Server running on port 8080!');
});


