import io from 'socket.io-client';
import d3 from 'd3';

export class Chat {
  messages = [];
  message = '';

  constructor() {
    var socket = io('localhost:3000');
    socket.emit('chat message', 'hello');

    socket.on('chat message', (msg) => {
      console.log('hello...');
      this.messages.push(msg);
    });

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

    g.append('circle').attr({
      cx: 150 + 120*Math.sin(90*Math.PI/180.0), cy: 150 + 120*Math.cos(90*Math.PI/180.0), r: 10
    }).style({ fill: '#F00', stroke: 'none' });

    g.append('circle').attr({
      cx: 150 + 120*Math.sin(140*Math.PI/180.0), cy: 150 + 120*Math.cos(140*Math.PI/180.0), r: 10
    }).style({ fill: '#F00', stroke: 'none' });

    g.append('circle').attr({
      cx: 150 + 80*Math.sin(240*Math.PI/180.0), cy: 150 + 80*Math.cos(240*Math.PI/180.0), r: 10
    }).style({ fill: '#2FF', stroke: 'none' });


  }

  test() {
    console.log('test called...');
  }
}
