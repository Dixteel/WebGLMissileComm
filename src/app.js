import {Conn} from './services/conn'
import {inject} from 'aurelia-framework';

@inject(Conn)
export class App {

  constructor(conn) {
    this.conn = conn;
  }

  configureRouter(config, router) {
    config.title = 'WebGL Missle Command';
    /*
    config.map([
      { route: 'chat', name: 'chat', moduleId: './chat',  nav: true, title:'Chit chat' },
      { route: ['', 'game'], name: 'main', moduleId: './main',  nav: true, title:'Missile Command' }
    ]);
    this.router = router;
    */
  }
}
