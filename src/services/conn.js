import io from 'socket.io-client';

/**
 * Holds the socket connection
 */
export class Conn {

  constructor() {
    this.socket = io('localhost:3000');
    this.state = 'login';

    // Keeps track of global states
    this.socket.on('player', ()=> {
      this.state = 'lobby';
    });
    this.socket.on('start-game', ()=> {
      this.state = 'game';
    });
  }

  getSocket() { return this.socket; }


  /**
   * Mostly an internal helper method
   */
  _send(type, payload) {
    this.socket.emit(type, payload);
  }
}
