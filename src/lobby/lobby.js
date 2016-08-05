import {inject} from 'aurelia-framework';
import {Conn} from '../services/conn';
import {UserService} from '../services/user-service';
import d3 from 'd3';

/**
* Simple chat lobby
*/
@inject(Conn, UserService)
export class Lobby {


  constructor(conn, userService) {
    this.userService = userService;
    this.conn = conn;
    this.messageList = [];
    this.msg = '';
    this.ready = 0;
  }

  start() {
    if (this.ready === 1) return;
    this.ready = 1;
    this.conn._send('ready', this.userService.player.id);
  }

  attached() {
    this.conn.getSocket().on('chat', (msg)=> {
      this.messageList.push(msg);
      if (this.messageList.length > 15) {
        this.messageList.shift();
      }
      // TODO: Auto scroll to bottom
    });

    this.conn.getSocket().on('start-game', (msg)=> {
      console.log('test', this.lobbyElement);
      // d3.select(this.lobbyElement).style('display', 'none');
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
