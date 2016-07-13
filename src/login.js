import {inject} from 'aurelia-framework';
import {UserService} from './services/user-service';
import {Conn} from './services/conn';

@inject(UserService, Conn)
export class Login {
  constructor(userService, conn) {
    console.log('login init...');
    this.username = '';
    this.userService = userService;
    this.conn = conn;
  }

  login() {
    console.log(this.userService.username);
    this.userService.init({
      username: this.username,
      userId: 0,
      score: 99
    });

    this.conn._send('login', 'world');
  }

}
