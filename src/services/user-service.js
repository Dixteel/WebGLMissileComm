import {singleton} from 'aurelia-framework';

export class UserService {
  constructor() {
    this.username = 'default';
    this.userId = null;
    this.score = 0;
  }

  get() {
    return this.username;
  }

  init(profile) {
    this.username = profile.username;
    this.userId = profile.userId;
    this.score = profile.score;
  }
}
