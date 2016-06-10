
export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['','welcome'], name: 'welcome', moduleId: './welcome', nav: true, title:'Welcome' },
      { route: 'users', name: 'users', moduleId: './users',  nav: true, title:'Github Users' },
      { route: 'chat', name: 'chat', moduleId: './chat',  nav: true, title:'Chit chat' },
      { route: 'game', name: 'game', moduleId: './game',  nav: true, title:'Game' }
      // { route: ['','test'], name: 'test', moduleId: './test', nav: true, title:'Test' },
    ]);

    this.router = router;
  }
}
