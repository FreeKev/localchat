require('dotenv').config();
var bodyParser = require('body-parser');
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');
var passport = require('./config/passportConfig');
var session = require('express-session');
var app = express();
var socket = require('socket.io');//require socket.io

app.use(express.static('public'));

// server.listen(80);
var server = app.listen(process.env.PORT || 3000);

var io = socket(server);

io.sockets.on('connection', function (socket) { // We are given a websocket object in our function
  console.log("We have a new client: " + socket.id);
  // When this user emits, client side: socket.emit('otherevent',some data);
  //##this is the emit in the sketch that sends a message 'mouse'
  // socket.on('mouse', function(data) {
  //   // Data comes in as whatever was sent, including objects
  //   console.log("Received: 'mouse' " + data.x + " " + data.y);
  //   // Send it to all other clients
  //   //##this sends all the data from the front end. The EXACT SAME DATA!!!!
  //   socket.broadcast.emit('mouse', data);
  //   //## This is a way to send to everyone including sender
  //   // io.sockets.emit('message', "this goes to everyone");
  // });

  socket.on('chat message', function(msg){
  io.emit('chat message', msg);
  });

  socket.on('disconnect', function() {
    console.log("Client has disconnected");
  });
});

// io.on('connection', function(socket){
//   socket.on('chat message', function(msg){
//     io.emit('chat message', msg);
//   });
// });

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
// Session above flash & passport bcs they use it
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.alerts = req.flash();
  next();
})

app.get('/', function(req, res){
  // res.send('home page coming soon');
  res.render('home');
});

app.get('/profile', isLoggedIn, function(req, res){
  res.render('profile');
});

app.use('/auth', require('./controllers/auth'));
// app.use('/chat', require('./controllers/chat'));
