var express = require('express');
var passport = require('../config/passportConfig');
var db = require('../models');
var router = express.Router();

// Try1
// module.exports.respond = function(socket_io){
//     socket_io.on('console',function(socket){
//         console.log('a user connected');
//     });
// }

// middleware
// router.use(express.static('public'))

// Original Tut 
// var io = require('socket.io')(3000);
// var redis = require('socket.io-redis');
// io.adapter(redis({ host: 'localhost', port: 6379 }));
//
// var io = require('socket.io-emitter')({ host: '127.0.0.1', port: 6379 });
// setInterval(function(){
//   io.emit('time', new Date);
// }, 5000);

router.get('/', function(req, res){
  // res.sendFile('/index.html');
  res.send('completely broken');
});


module.exports = router;
