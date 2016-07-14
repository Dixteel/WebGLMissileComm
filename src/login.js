import {inject} from 'aurelia-framework';
import {Conn} from './services/conn';

@inject(Conn)
export class Login {
  constructor(conn) {
    console.log('login init...');
    this.username = '';
    this.conn = conn;
  }

  login() {
    this.conn._send('login', this.username);
  }

}
