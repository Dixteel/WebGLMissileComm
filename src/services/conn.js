import io from 'socket.io-client';

/**
 * Holds the socket connection
 */
export class Conn {
  socket = null;

  constructor() {
    this.socket = io('localhost:3000');

    this.socket.on('login', function(msg) {
      console.log('login >', msg);
    });
  }

  getSocket() { return this.socket; }


  /**
   * Mostly an internal helper method
   */
  _send(type, payload) {
    console.log('sending', type, payload);
    this.socket.emit(type, {
      a: 10, b: 20, c: "hello world"
    });
  }
}
