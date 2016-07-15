import {inject} from 'aurelia-framework';
import {Conn} from './services/conn';
import {UserService} from './services/user-service';

/**
* Simple chat lobby
*/
@inject(Conn, UserService)
export class Lobby {

  constructor(conn, userService) {
    this.userService = userService;
    this.conn = conn;
  }

  sendMessage(msg) {
  }
}
