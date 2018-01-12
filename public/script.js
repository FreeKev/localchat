console.log('connected, k');

// $('.delete-link').click(function(e){
//   e.preventDefault();
//   $.ajax({
//     url: $(this).attr('href'),
//     method: 'DELETE'
//   }).success(function(data){
//     window.location.href = '/';
//   });
// });

var socket;

function setup() {
  socket = io.connect('http://localhost:3000');

  socket.on('mouse', function(data) {// When we receive data
    console.log("Got: " + data.x + " " + data.y);
  });
}

function mouseDragged() {
  sendmouse(mouseX,mouseY);
}

function sendmouse(xpos, ypos) {
  // We are sending!
  console.log("sendmouse: " + xpos + " " + ypos);
  // Make a little object with  and y
  var data = {
    x: xpos,
    y: ypos
  };
  // Send that object to the socket
  socket.emit('mouse',data);
  }
