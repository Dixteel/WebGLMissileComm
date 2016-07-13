var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var static = require('node-static');

var file = new(static.Server)('./');

// Init
// 0) Player registration
// 1) Acknolwedgement to begin
// 2) Broadcast initial positions
// 3) *** Listen ***

// listen
// 0) Update
// 1) Broadcast (debounce this???)
var updateHandle = null;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('connection detected...');
  io.emit('chat message', 'new person joined');

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });


  socket.on('login', function(msg) {
    console.log('login > ', msg);
    socket.emit('login', 'success');
  });

});

function update() {
  io.emit('update', (new Date()));
}

updateHandle = setInterval(update, 100);

app.get(/\w*/, function(req, res){
   file.serve(req, res);
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
