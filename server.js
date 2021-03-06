var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var static = require('node-static');

var file = new(static.Server)('./');
var players = [];
var playerIdCounter = 0;
var updateHandle = null;


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('disconnection', function(socket) {
  console.log('disconnected...', socket.id);
});


io.on('connection', function(socket){
  console.log('connection detected...');
  io.emit('chat message', 'new person joined');

  socket.on('chat', function(msg){
    io.emit('chat', msg);
  });

  socket.on('ready', function(id) {
    players.find(function(player) { return player.id === id; }).ready = 1;
    io.emit('players', players);

    var numReady = players.filter(player => { return player.ready === 1;}).length;
    if (numReady >= players.length) {
      console.log('all players ready...starting game');
      io.emit('start-game', {});
    }
  });

  socket.on('disconnect', function() {
    console.log('disconnected');

    var index = players
      .map(function(d) { return d.socketId; })
      .indexOf(socket.id);

    if (index >= 0) {
      players.splice(index, 1);
    }
    io.emit('players', players);
  });


  /**
   * Login.
   *
   * @param {string} name - username
   */
  socket.on('login', function(name) {
    var player = {
      name: name,
      id: ++playerIdCounter,
      ready: 0,
      socketId: socket.id
    }
    players.push(player);

    socket.emit('player', player);
    io.emit('players', players);
    io.emit('chat', { player: '***', msg: name + ' has joined the lobby' });
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
