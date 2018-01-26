var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(3000);
console.log("Server listening on port 3000");

app.use(express.static(__dirname));

//Set a route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//Socket setup
io.on('connection', (socket) => {
  //socket.emit('request', /* */); // emit an event to the socket
  //io.emit('broadcast', /* */); // emit an event to all connected sockets

  // Handle what happens when client socket sends data. Here, we "grab" the data and echo it back in an object
  socket.on('clientmsg', (data) => { 
     io.emit('servermsg', { msg: data });
  }); 

});
