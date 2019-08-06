const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
require("dotenv").config();
const cuid = require('cuid');
const app = express();

const PORT = process.env.PORT || 3001;

const server = http.Server(app);
const io = require("socket.io")(server);

let rooms;
Rooms = {};
//=========================== Socket io =================================>>>>>>>>
io.on('connection', (socket) => {

  // Create a new game room and notify the creator of game.
  socket.on('createGame', (data) => {
    rooms = cuid();
    socket.join(`${rooms}`);
    const users = [];
    Rooms[`${rooms}`] = {};
    users.push({name: data.name, room: `${rooms}`});
    Rooms[`${rooms}`] = users;
    console.log("Rooms", Rooms);
    socket.emit('newGame', {name: data.name, room: `${rooms}`, users});
    console.log(`creating new game on room: ${rooms}`);
  });

  // Connect the Player 2 to the room he requested. Show error if room full.
  socket.on('joinGame', function (data) {
    console.log('JoiningGame...');
    console.log(data.room);
    var room = io.nsps['/'].adapter.rooms[data.room];
    if (room && room.length === 1) {
      socket.join(data.room);
      Rooms[`${rooms}`].push({name: data.name, room: `${rooms}`});
      console.log("Join Room Test->", Rooms[`${rooms}`])
      socket.broadcast.to(data.room).emit('player1', {users: [Rooms[`${rooms}`][1], Rooms[`${rooms}`][0]]});
      socket.emit('player2', {
        name: data.name,
        room: data.room,
        message: 'You, have Joined the room is successfully!',
        users: Rooms[`${rooms}`]
      });
      console.log('Player2 Joined!!');
    } else {
      socket.emit('err', {message: 'Sorry, The room is full! Please join another room or create a new one'});
      console.log('Sorry, The room is full!');
    }
  });

  //====================== Emiting to a single user on one browser =========>>>>
  socket.on('userInput', data => {
    console.log(data);
    socket.to(data.room).emit('secondUserInput', {codeInput: data.input, barProgress: data.barProgress});
  });
  //====================== Emiting to a single user on one browser =========>>>>

  socket.on('StartGame', (data) => {
    console.log('GameStarted');
    // console.log(data.code)
    if (data.player === 'player2') {
      socket.to(data.room).emit('player1', {isGameStarted: data.isGameStarted, room: data.room});
      console.log("brodcast to player1 game started Now")
    } else {
      //socket.emit('player1', {isGameStarted: true});
      socket.to(data.room).emit('player2', {isGameStarted: data.isGameStarted, room: data.room});
      console.log("brodcast to player2 game started Now")
    }
  });

  socket.on('EndGame', (data) => {
    console.log('EndGame');
    //console.log(data.code)
    if (data.player === 'player2') {
      socket.to(data.room).emit('player1', {
        isGameEnded: data.isGameEnded,
        room: data.room,
        computerwins: data.computerwins
      });
      console.log("brodcast to player1 game End Now")
    } else {
      socket.to(data.room).emit('player2', {
        isGameEnded: data.isGameEnded,
        room: data.room,
        computerwins: data.computerwins
      });
      console.log("brodcast to player2 game End Now")
    }
  });
  socket.on('gameEnded', (data) => {
    console.log('gameEnded');
    socket.broadcast.to(data.room).emit('gameEnd', data);
  });

  socket.on('Logout', (data) => {
    console.log(data)
    if (data.player === 'player2') {
      socket.to(data.room).emit('player1', {isLogout: data.isLogout, room: data.room});
      console.log("brodcast to player1 game Logout")
    } else {
      socket.to(data.room).emit('player2', {isLogout: data.isLogout, room: data.room});
      console.log("brodcast to player2 game Logout")
    }
  });
});

// io.listen(port);
// console.log(`🌎 Socket.io connection made on http://localhost${port}`);
//========================================================================>>>>>>>>

// Define middleware here
app.use(express.urlencoded({extended: true}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/codeduel_new_DB", {useNewUrlParser: true});

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
require("./routes/user-routes")(app);

if (process.env.NODE_ENV === "production") {
  app.get("*", function (req, res) {
    res.sendFile(__dirname + "/client/build/index.html");
  });
}

// Start the API server plug it!
server.listen(PORT, function () {
  console.log(`🌎  ==> Express Server now listening on PORT ${PORT} --- http://localhost:${PORT}`);
});
