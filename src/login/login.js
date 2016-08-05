import {inject} from 'aurelia-framework';
import {Conn} from '../services/conn';
import {UserService} from '../services/user-service';

import {Stage} from '../stage';

@inject(Conn, UserService)
export class Login {
  constructor(conn, userService) {
    console.log('login init...');
    this.username = '';
    this.conn = conn;
    this.userService = userService;

    this.x = new Stage();
    console.log(this.x);
  }

  login() {
    this.conn._send('login', this.username);
  }

}
