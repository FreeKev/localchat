console.log('connected, k');

var socket;

function setup() {
  socket = io.connect('http://localhost:3000');

  // socket.on('mouse', function(data) {// When we receive data
  //   console.log("Got: " + data.x + " " + data.y);
  //   // Draw a blue circle
  //   fill(0,0,255);
  //   noStroke();
  //   ellipse(data.x, data.y, 20, 20);
  // });
}
