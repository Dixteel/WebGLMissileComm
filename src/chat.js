import io from 'socket.io-client';

export class Chat {
  messages = [];

  constructor() {
    var socket = io('localhost:3000');
    socket.emit('chat message', 'hello');

    socket.on('chat message', (msg) => {
      console.log('hello...');
      this.messages.push(msg);
    });
  }
}
