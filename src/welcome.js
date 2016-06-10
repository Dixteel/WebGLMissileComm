export class Welcome {
  heading = 'Aurelia socket test!';
  firstName = 'John';
  lastName = 'Doe';

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  submit() {
    alert(`Welcome, ${this.fullName}!`);
  }
}
