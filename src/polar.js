
export class Polar {
  constructor() {
  }

  a2r(angle) {
    return angle * Math.PI / 180.0;
  }

  r2a(radian) {
    return radian * 180.0 / Math.PI;
  }

  getXY(angle, radius) {
    return {
      x: radius * Math.cos(this.a2r(angle)),
      y: -radius * Math.sin(this.a2r(angle))
    };
  }

  polarTest() {
    console.log('polar test');
  }
}
