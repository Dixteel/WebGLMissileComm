import {inject} from 'aurelia-framework';
import {Conn} from './services/conn';
import {UserService} from './services/user-service';

@inject(Conn, UserService)
export class Login {
  constructor(conn, userService) {
    console.log('login init...');
    this.username = '';
    this.conn = conn;
    this.userService = userService;
  }

  login() {
    this.conn._send('login', this.username);
    console.log(this.isLoggedIn());
  }

  isLoggedIn() {
    return this.userService.player.name? 1 : 0;
  }

}
