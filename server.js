var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var static = require('node-static');

var file = new(static.Server)('./');


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('connection detected...');
  io.emit('chat message', 'new person joined');

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

app.get(/\w*/, function(req, res){
   file.serve(req, res);
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
