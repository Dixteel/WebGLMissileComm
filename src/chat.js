import {inject} from 'aurelia-framework';
import io from 'socket.io-client';
import d3 from 'd3';
import {Polar} from 'polar';

@inject(Polar)
export class Chat {
  messages = [];
  message = '';
  socket;

  constructor(polar) {
    this.socket = io('localhost:3000');
    this.socket.emit('chat message', 'hello');

    this.socket.on('chat message', (msg) => {
      console.log('hello...');
      this.messages.push(msg);
    });
    /*
    socket.on('update', (msg) => {
      console.log(msg);
    });
    */

    console.log('!!!', polar);

    this.polar = polar;
  }

  attached() {
    console.log('do I have d3?', d3);
    console.log('do I have ref?', this.canvasDiv);

    var svg = d3.select(this.canvasDiv).append('svg').attr({
      width: 300, height: 300
    });
    var g = svg.append('g');
    g.append('circle').attr({
      cx: 150, cy: 150, r: 80
    }).style({
      fill: 'none', stroke: '#888'
    });

    g.append('circle').attr({
      cx: 150, cy: 150, r: 120
    }).style({
      fill: 'none', stroke: '#888'
    });


    /*
    for (var i=0; i < 5; i++) {
      var pos = {};
      pos = this.polar.getXY(20*i, 120);
      g.append('circle').attr({
        cx: 150 + pos.x, cy: 150 + pos.y, r:   5 + 2*i
      }).style({ fill: '#F00', stroke: 'none' });
    }
    */

    /*
    for (var i=0; i < 15; i++) {
      var pos = {};
      pos = this.polar.getXY(-30*i, 10* i);
      g.append('circle').attr({
        cx: 150 + pos.x, cy: 150 + pos.y, r: 4 + 0.5*i
      }).style({ fill: '#F44', stroke: 'none' });
    }
    */




  }

  test() {
    console.log('test called...', this.msg);
    this.socket.emit('chat message', this.msg);
    this.msg = '';
  }
}
