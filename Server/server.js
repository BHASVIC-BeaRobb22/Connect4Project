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
});

server.listen(8080, () => {
  console.log('Server running on port 8080!');
});


