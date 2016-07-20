var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
});

io.on('connection', function(socket){

  socket.broadcast.emit('notifications', 'new user joined the chat');

  socket.on('chat message', function(data){
    io.emit('chat message', data.nickname + '  said: ' + data.message);
  });

  socket.on('typing', function(data){
    socket.broadcast.emit('notifications', data.nickname + ' is typing');
  });
});

http.listen(3000, function() {
  console.log('listening on 3000');
});
