import io from 'socket.io-client';

/**
 * Holds the socket connection
 */
export class Conn {
  socket = null;

  constructor() {
    this.socket = io('localhost:3000');
  }

  getSocket() { return this.socket; }


  /**
   * Mostly an internal helper method
   */
  _send(type, payload) {
    this.socket.emit(type, payload);
  }
}
