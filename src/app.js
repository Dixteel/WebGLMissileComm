
export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: 'chat', name: 'chat', moduleId: './chat',  nav: true, title:'Chit chat' },
      { route: ['', 'game'], name: 'main', moduleId: './main',  nav: true, title:'Missile Command' }
    ]);
    this.router = router;
  }
}
