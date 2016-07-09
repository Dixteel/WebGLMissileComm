
export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: 'chat', name: 'chat', moduleId: './chat',  nav: true, title:'Chit chat' },
      { route: ['', 'game'], name: 'game', moduleId: './game',  nav: true, title:'Game' }
    ]);
    this.router = router;
  }
}
