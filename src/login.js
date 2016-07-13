import {inject} from 'aurelia-framework';
import {UserService} from './services/user-service'

@inject(UserService)
export class Login {
  constructor(userService) {
    console.log('login init...');
    this.username = '';
    this.userService = userService;
  }

  login() {
    console.log(this.userService.username);
    this.userService.init({
      username: this.username,
      userId: 0,
      score: 99
    });
  }

}
