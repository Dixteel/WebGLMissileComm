import {inject} from 'aurelia-framework';
import {Conn} from './conn';

@inject(Conn)
export class UserService {

  players = [];
  player = {};


  constructor(conn) {
    this.conn = conn;

    this.conn.getSocket().on('player', (player)=> {
      //console.log('player', player);
      this.player = player;
    });

    this.conn.getSocket().on('players', (players)=> {
      //console.log('players', players);
      this.players = players;
    });
  }


}
