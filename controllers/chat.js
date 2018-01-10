var express = require('express');
var passport = require('../config/passportConfig');
var db = require('../models');
var router = express.Router();
var http = require('http').Server(router);
var io = require('socket.io')(http);

router.use(express.static('public'))

router.get('/', function(req, res){
  res.sendFile('/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

// http.listen(4000, function(){
//   console.log('listening on *:4000');
// });
http.listen();

module.exports = router;
