import {inject} from 'aurelia-framework';
import {Conn} from './services/conn';
import {UserService} from './services/user-service';

/**
* Simple chat lobby
*/
@inject(Conn, UserService)
export class Lobby {

  messageList = [];
  msg = '';

  constructor(conn, userService) {
    this.userService = userService;
    this.conn = conn;
    this.messageList = [];
    this.msg = '';
  }

  attached() {
    this.conn.getSocket().on('chat', (msg)=> {
      this.messageList.push(msg);
    });
  }

  sendMessage() {
    let payload = {
      player: this.userService.player.name,
      msg: this.msg
    };
    this.conn._send('chat', payload);
    this.msg = '';
  }

}
